import express from "express";
import db from "../utils/connect.js";
import ecpay_payment from "ecpay_aio_nodejs";

const router = express.Router();
const { MERCHANTID, HASHKEY, HASHIV, BACKEND_HOST, FRONTEND_HOST } =
  process.env;

const options = {
  OperationMode: "Test",
  MercProfile: {
    MerchantID: MERCHANTID,
    HashKey: HASHKEY,
    HashIV: HASHIV,
  },
  IgnorePayment: [
    // "Credit",
    // "WebATM",
    // "ATM",
    // "CVS",
    // "BARCODE",
    // "AndroidPay"
  ],
  IsProjectContractor: false,
};

let TradeNo;

router.get("/", async (req, res) => {
  const { orderId, checkoutTotal } = req.query;
  TradeNo = "KK" + new Date().getTime().toString();
  const MerchantTradeDate = new Date().toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Taipei",
  });

  try {
    const sql = `
      SELECT pm.product_name 
      FROM order_details od
      LEFT JOIN product_management pm ON pm.product_id = od.order_product_id
      WHERE od.order_id = ?;
    `;

    const [rows] = await db.query(sql, [orderId]);
    const productItemNames = rows.map((row) => row.product_name).join("#");

    const updateTradeNoSql = `
      UPDATE orders
      SET merchant_trade_no = ?
      WHERE id = ?
    `;

    const [tradeNoRow] = await db.query(updateTradeNoSql, [TradeNo, orderId]);

    const base_param = {
      MerchantTradeNo: TradeNo,
      MerchantTradeDate,
      PaymentType: "aio",
      TotalAmount: checkoutTotal,
      TradeDesc: "knock knock board game",
      ItemName: productItemNames,
      ReturnURL: `https://13bf-2001-b400-e70e-5ede-a53d-930c-78ca-38f3.ngrok-free.app/payments/return`,
      ChoosePayment: "Credit",
      EncryptType: 1,
      ClientBackURL: `http://localhost:3000/product?page=1`,
      OrderResultURL: `http://localhost:3000/checkout/success?order_id=${orderId}`,
      NeedExtraPaidInfo: "Y",
    };

    const create = new ecpay_payment(options);
    const html = await create.payment_client.aio_check_out_all(base_param);
    console.log("base_param, url", base_param, html);

    res.json({
      success: true,
      TradeNo: TradeNo,
      html,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ success: false, message: "Error creating payment" });
  }
});

router.post("/return", async (req, res) => {
  console.log("req.body:", req.body);
  const data = { ...req.body };
  const {
    CheckMacValue,
    RtnCode,
    PaymentDate,
    PaymentType,
    TradeNo,
    MerchantTradeNo,
  } = req.body;
  delete data.CheckMacValue; // 此段不驗證

  const create = new ecpay_payment(options);
  const checkValue = create.payment_client.helper.gen_chk_mac_value(data);
  // 轉換 TradeDate 為 MySQL datetime 格式
  const formatPaymentDate = new Date(PaymentDate)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  console.log(
    "確認交易正確性：",
    CheckMacValue === checkValue,
    CheckMacValue,
    checkValue
  );

  if (CheckMacValue === checkValue) {
    const orderStatus = +RtnCode === 1 ? 2 : 1;
    // 更新資料庫
    const sql = `
      UPDATE orders
      SET rtn_code = ?, payment_date = ?, payment_type = ?, trade_no = ?, order_status_id = ?
      WHERE merchant_trade_no = ?;
    `;

    try {
      await db.query(sql, [
        RtnCode,
        formatPaymentDate,
        PaymentType,
        TradeNo,
        orderStatus,
        MerchantTradeNo,
      ]);
      console.log("資料庫更新成功");
    } catch (error) {
      console.error("資料庫更新失敗:", error);
    }

    // 交易成功後，需要回傳 1|OK 給綠界
    res.send("1|OK");
  } else {
    console.log("比對失敗");
    res.status(400).send("比對失敗");
  }

  // // 交易成功後，需要回傳 1|OK 給綠界
  // if (CheckMacValue === checkValue) {
  //   res.send("1|OK");
  // } else {
  //   console.log("比對失敗");
  // }
});

export default router;

// ReturnURL為付款結果通知回傳網址，為特店server或主機的URL，用來接收綠界後端回傳的付款結果通知。
// ClientBackURL 消費者點選此按鈕後，會將頁面導回到此設定的網址
// OrderResultURL 有別於ReturnURL (server端的網址)，OrderResultURL為特店的client端(前端)網址。消費者付款完成後，綠界會將付款結果參數以POST方式回傳到到該網址
// 綠界回傳範例
/*
req.body: {
  TotalSuccessTimes: '',
  PaymentNo: '',
  PaymentTypeChargeFee: '0',
  red_dan: '',
  red_yet: '',
  gwsr: '',
  red_ok_amt: '',
  PeriodType: '',
  SimulatePaid: '1',
  AlipayTradeNo: '',
  MerchantID: '3002607',
  TenpayTradeNo: '',
  WebATMAccNo: '',
  TradeDate: '2024/07/06 13:07:22',
  TWQRTradeNo: 'OPAY20240706130735',
  RtnMsg: '付款成功',
  CustomField4: '',
  PayFrom: '',
  ATMAccBank: '',
  PaymentType: 'TWQR_OPAY',
  TotalSuccessAmount: '',
  MerchantTradeNo: 'test1720242438974',
  StoreID: '',
  stage: '',
  WebATMAccBank: '',
  CustomField1: '',
  PeriodAmount: '',
  TradeNo: '2407061307225373',
  card4no: '',
  card6no: '',
  auth_code: '',
  stast: '',
  PaymentDate: '2024/07/06 13:08:18',
  CheckMacValue: '0C3D8E0873B3B43E97CCF843BAAF5AC031F4A02DED778268E597F3E028E64A70',
  RtnCode: '1',
  eci: '',
  TradeAmt: '1363',
  Frequency: '',
  red_de_amt: '',
  process_date: '',
  amount: '',
  CustomField2: '',
  ATMAccNo: '',
  ExecTimes: '',
  CustomField3: '',
  staed: '',
  WebATMBankName: '',
  AlipayID: ''
}
 */
