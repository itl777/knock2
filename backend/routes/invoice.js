import express from "express";
import db from "../utils/connect.js";
import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment-timezone";


const router = express.Router();
const { MERCHANTID_INVOICE, HASHKEY_INVOICE, HASHIV_INVOICE } = process.env;
const API_URL = "https://einvoice-stage.ecpay.com.tw/B2CInvoice/Issue";

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
  RelateNumber = "KI" + new Date().getTime().toString();

  try {
    const data = {
      MerchantID: MERCHANTID_INVOICE,
      RelateNumber: RelateNumber,
      CustomerID: "CUST12345678",
      CustomerIdentifier: "",
      CustomerName: "Knock Knock",
      CustomerAddr: "台北市美麗區帥哥路777號",
      CustomerPhone: "0987654321",
      CustomerEmail: "test@example.com",
      Print: "0",
      Donation: "0",
      CarrierType: "3",
      CarrierNum: "/A129482",
      TaxType: "1",
      SalesAmount: 1000,
      InvType: "07",
      Items: [
        {
          ItemSeq: 1,
          ItemName: "item name",
          ItemCount: 10,
          ItemWord: "盒",
          ItemPrice: 100,
          ItemTaxType: 1,
          ItemAmount: 1000,
        },
      ],
      // 其他參數根據需要添加
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
    console.error("Database error:", error);
    throw error;  // 重新拋出錯誤，讓調用者知道發生了問題
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
