import express from "express";
import ecpay_payment from "ecpay_aio_nodejs";
import morgan from "morgan";

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
  TradeNo = "kk" + new Date().getTime().toString();
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

  const base_param = {
    MerchantTradeNo: TradeNo,
    MerchantTradeDate,
    PaymentType: "aio",
    TotalAmount: checkoutTotal,
    TradeDesc: "knock knock trade desc",
    ItemName: "knock knock item name",
    ReturnURL: `https://4ed4-223-139-24-45.ngrok-free.app/payments/return`,
    ChoosePayment: "Credit",
    EncryptType: 1,
    ClientBackURL: `http://localhost:3000/product?page=1`,
    // OrderResultURL: `http://localhost:3000/user/orders/details/${orderId}`,
    OrderResultURL: `http://localhost:3000/checkout/success?order_id=${orderId}`,
    NeedExtraPaidInfo: "Y",
  };
  try {
    const create = new ecpay_payment(options);
    const html = await create.payment_client.aio_check_out_all(base_param);
    console.log("base_param, url", base_param, html);

    res.json({
      success: true,
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
  const { CheckMacValue } = req.body;
  delete data.CheckMacValue; // 此段不驗證

  const create = new ecpay_payment(options);
  const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

  console.log(
    "確認交易正確性：",
    CheckMacValue === checkValue,
    CheckMacValue,
    checkValue
  );

  // 交易成功後，需要回傳 1|OK 給綠界
  if (CheckMacValue === checkValue) {
    res.send("1|OK");
  } else {
    console.log("比對失敗");
  }
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
