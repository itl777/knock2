import express from "express";
import db from "../utils/connect.js";
import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment-timezone";

const router = express.Router();
const { MERCHANTID_INVOICE, HASHKEY_INVOICE, HASHIV_INVOICE } = process.env;
const API_URL = "https://einvoice-stage.ecpay.com.tw/B2CInvoice/Issue";

// 綠界時間轉換
function formatInvoiceDate(dateString) {
  // 將 "+" 替換為空格
  const formattedDate = dateString.replace("+", " ");
  // 創建一個 UTC 日期對象
  const utcDate = new Date(formattedDate + "Z"); // 添加 'Z' 表示這是 UTC 時間

  // 轉換為台灣時間
  const taiwanDate = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000); // 加上 8 小時

  // 格式化為 MySQL datetime 格式
  return taiwanDate.toISOString().slice(0, 19).replace("T", " ");
}

// 加密函數
const encrypt = (text) => {
  const key = CryptoJS.enc.Utf8.parse(HASHKEY_INVOICE);
  const iv = CryptoJS.enc.Utf8.parse(HASHIV_INVOICE);
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return encrypted.toString();
};

// 解密函數
const decrypt = (text) => {
  const key = CryptoJS.enc.Utf8.parse(HASHKEY_INVOICE);
  const iv = CryptoJS.enc.Utf8.parse(HASHIV_INVOICE);
  const decrypted = CryptoJS.AES.decrypt(text, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

// 產生 CheckMacValue
const generateCheckMacValue = (data) => {
  const sortedKeys = Object.keys(data).sort();
  let checkString = `HashKey=${HASHKEY_INVOICE}`;
  sortedKeys.forEach((key) => {
    checkString += `&${key}=${data[key]}`;
  });
  checkString += `&HashIV=${HASHIV_INVOICE}`;
  const encodedString = encodeURIComponent(checkString).toLowerCase();
  return CryptoJS.SHA256(encodedString).toString().toUpperCase();
};

let RelateNumber;

router.post("/issue-invoice", async (req, res) => {
  const { order_id } = req.body;
  const { order, items } = await getOrderData(order_id);

  RelateNumber = "KI" + new Date().getTime().toString();

  const print = order.recipient_tax_id ? "1" : "0"
  const carrierType = order.recipient_tax_id ? "" : "3"

  try {
    const data = {
      MerchantID: MERCHANTID_INVOICE,
      RelateNumber: RelateNumber,
      CustomerID: order.member_id.toString(),
      CustomerIdentifier: order.recipient_tax_id || "",
      CustomerName: order.name,
      CustomerAddr: order.full_address,
      CustomerPhone: order.recipient_mobile,
      CustomerEmail: order.account,
      Print: print,
      Donation: "0",
      CarrierType: carrierType,
      CarrierNum: order.recipient_invoice_carrier || "",
      TaxType: "1",
      SalesAmount: order.total_price,
      InvType: "07",
      Items: items,
    };

    const jsonData = JSON.stringify(data);
    const encodedData = encodeURIComponent(jsonData);
    const encryptedData = encrypt(encodedData);

    const requestData = {
      MerchantID: MERCHANTID_INVOICE,
      RqHeader: {
        Timestamp: Math.floor(Date.now() / 1000),
      },
      Data: encryptedData,
    };

    const response = await axios.post(API_URL, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const decryptedData = decrypt(response.data.Data);
    const decodedData = decodeURIComponent(decryptedData);
    const resultData = JSON.parse(decodedData);

    // 儲存發票資訊到數據庫
    await saveInvoiceToDatabase(order_id, resultData);

    res.json({
      status: true,
      message: "Invoice issued and saved successfully",
      data: resultData,
      order_id: order_id,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});

async function getOrderData(order_id) {
  const orderSql = `
    SELECT
      o.id order_id,
      o.order_date,
      o.member_id,
      u.name,
      u.account,
      CONCAT(c.city_name, d.district_name, o.order_address) AS full_address,
      o.recipient_name,
      o.recipient_mobile,
      o.recipient_invoice_carrier,
      o.recipient_tax_id,
      o.deliver_fee,
      SUM(od.order_quantity * od.order_unit_price) + o.deliver_fee AS total_price
      FROM orders o
      LEFT JOIN users u ON u.user_id = o.member_id
      LEFT JOIN district d ON d.id = o.order_district_id
      LEFT JOIN city c ON c.id = d.city_id
      LEFT JOIN order_details od ON od.order_id = o.id
    WHERE o.id = ?
    GROUP BY o.id
  `;

  const detailsSql = `
    SELECT
      od.order_id,
      od.order_product_id,
      pm.product_name,
      od.order_unit_price,
      od.order_quantity,
      (od.order_quantity * od.order_unit_price) AS product_total_price
      FROM order_details od
      LEFT JOIN product_management pm ON pm.product_id = od.order_product_id
    WHERE od.order_id = ?
  `;

  try {
    const [orderResult] = await db.query(orderSql, [order_id]);
    const [detailsResult] = await db.query(detailsSql, [order_id]);

    if (orderResult.length === 0) {
      throw new Error("Order not found");
    }

    const order = orderResult[0];

    let items = detailsResult.map((item, index) => ({
      ItemSeq: index + 1,
      ItemName: item.product_name,
      ItemCount: item.order_quantity,
      ItemWord: "個", // 或其他適當的單位
      ItemPrice: item.order_unit_price,
      ItemTaxType: "1", // 假設所有商品都是應稅
      ItemAmount: item.product_total_price,
    }));

    // 添加運費項目（如果有運費）
    if (order.deliver_fee > 0) {
      items.push({
        ItemSeq: items.length + 1,
        ItemName: "運費",
        ItemCount: 1,
        ItemWord: "式",
        ItemPrice: order.deliver_fee,
        ItemTaxType: "1", // 假設運費也是應稅的
        ItemAmount: order.deliver_fee,
      });
    }

    console.log(order, items);
    return { order, items };
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

async function saveInvoiceToDatabase(order_id, data) {
  // 轉換日期格式
  const invoiceDate = moment(data.InvoiceDate, "YYYY-MM-DD+HH:mm:ss")
    .tz("Asia/Taipei")
    .format("YYYY-MM-DD HH:mm:ss");

  const sql = `
    UPDATE orders
    SET
      invoice_rtn_code = ?,
      invoice_no = ?,
      invoice_date = ?,
      invoice_random_number = ?,
      last_modified_at = NOW()
    WHERE id = ?
  `;

  try {
    const [result] = await db.query(sql, [
      data.RtnCode,
      data.InvoiceNo,
      invoiceDate,
      data.RandomNumber,
      order_id,
    ]);
    console.log("Update result:", result);
    if (result.affectedRows === 0) {
      throw new Error("No rows updated. Order ID might not exist.");
    }
  } catch (error) {
    console.error("Database error:", error, data);
    throw error; // 重新拋出錯誤，讓調用者知道發生了問題
  }
}

router.get("/invoice/:id", async (req, res) => {
  try {
    const invoiceId = req.params.id;
    // 從數據庫獲取發票詳情
    const invoice = await getInvoiceFromDatabase(invoiceId);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.json(invoice);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the invoice" });
  }
});

async function getInvoiceFromDatabase(invoiceId) {
  const sql = `
    SELECT * FROM orders
    WHERE invoice_no = ?
  `;
  const [rows] = await db.query(sql, [invoiceId]);
  return rows[0];
}

export default router;
