import express from "express";
import moment from "moment-timezone";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../utils/connect.js";
import upload from "../../utils/upload-avatar.js";
import schemaForm from "./schema-profile.js";
import transporter from "../../configs/mail.js";
import { createOtp } from "./createOtp.js";

const dateFormat = "YYYY-MM-DD";
const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";
const router = express.Router();

// // 模擬網路延遲的狀況 middleware
// router.use((req, res, next) => {
//   const ms = 100 + Math.floor(Math.random() * 2000);
//   setTimeout(() => {
//     next();
//   }, ms);
// });

// 登入功能
router.post("/login-jwt", upload.none(), async (req, res) => {
  const output = {
    success: false,
    code: 0,
    error: "",
    data: {
      id: 0,
      nickname: "",
      avatar: "",
      token: "",
    },
  };

  const sql = "SELECT * FROM users WHERE account=?";
  const [rows] = await db.query(sql, [req.body.account]);

  if (!rows.length) {
    // 帳號是錯的
    output.code = 400;
    output.error = "帳號或密碼錯誤";
    return res.json(output);
  }

  const result = await bcrypt.compare(req.body.password, rows[0].password);
  if (!result) {
    // 密碼是錯的
    output.code = 420;
    output.error = "帳號或密碼錯誤";
    return res.json(output);
  }

  output.success = true;

  // 沒有要紀錄session狀態，改jwt
  const payload = {
    id: rows[0].user_id,
    account: rows[0].account,
  };
  const token = jwt.sign(payload, process.env.JWT_KEY);

  output.data = {
    id: rows[0].user_id,
    nickname: rows[0].nick_name,
    avatar: rows[0].avatar,
    token,
  };

  res.json(output);
});

// 驗證 jwt token
router.post("/verify-token", (req, res) => {
  const output = { success: true, payload: {} };
  try {
    output.payload = jwt.verify(req.body.token, process.env.JWT_KEY);
  } catch (ex) {
    // 如果 token 是無效的
    output.payload = req.body.token;
    output.success = false;
  }

  res.json(output);
});

// 讀取profile-form資料的api
router.post("/api", async (req, res) => {
  const output = {
    success: false,
    error: 0,
    users: {},
  };

  if (!req.my_jwt?.id) {
    output.error = "沒登入";
    return res.json(output);
  }

  const id = +req.my_jwt?.id || 0;
  if (!id) {
    output.error = "找不到這筆資料";
    return res.json(output);
  }

  const sql1 = `SELECT account,name,nick_name,gender,birthday,users.mobile_phone,invoice_carrier_id,tax_id,avatar 
  FROM users WHERE users.user_id = ${id}`;
  const [users] = await db.query(sql1);

  if (!users.length) {
    //沒有該筆資料
    output.error = "資料庫沒有這筆用戶";
    return res.json(output);
  }

  const m = moment(users[0].birthday);
  users[0].birthday = m.isValid() ? m.format(dateFormat) : "";

  const sql2 = `SELECT address.id,postal_codes,address,recipient_name,address.mobile_phone as recipient_phone,type,district_name,city_name 
  FROM address 
  LEFT JOIN district
  ON district_id = district.id 
  LEFT JOIN city
  ON city_id = city.id 
  WHERE user_id = ${id}`;
  const [address] = await db.query(sql2);

  output.success = true;
  output.users = users[0];
  if (address.length !== 0) {
    output.address = address;
  }
  res.json(output);
});

// 處理profile-form編輯的api
router.put("/api", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    error: "",
    result: {},
  };

  if (!req.my_jwt?.id) {
    output.error = "沒登入";
    return res.json(output);
  }

  const id = +req.my_jwt?.id || 0;
  if (!id) {
    output.error = "找不到這筆資料";
    return res.json(output);
  }

  // 表單驗證
  const result = schemaForm.safeParse(req.body.users);

  const newProfileFormErrors = {
    name: "",
    nick_name: "",
    birthday: "",
    mobile: "",
    invoice_carrier_id: "",
    tax_id: "",
  };

  if (!result.success) {
    if (result.error?.issues?.length) {
      for (let issue of result.error.issues) {
        newProfileFormErrors[issue.path[0]] = issue.message;
      }
      setProfileFormErrors(newProfileFormErrors);
    }
    return; // 表單資料沒有驗證通過就直接返回
  }

  // 更新地址
  if (req.body.address) {
    let address_id = req.body.address.address_id;
    try {
      // 第一次地址全部洗成 0
      const sql_address_1 = "UPDATE `address` SET type = 0 WHERE user_id=? ";
      const [result1] = await db.query(sql_address_1, id);
      output.result_address_1 = result1;

      // 第二次指定address_id洗成1
      const sql_address_2 = "UPDATE `address` SET type = 1 WHERE id=? ";
      const [result2] = await db.query(sql_address_2, address_id);

      output.result_address_2 = result2;
      output.address_success = !!(result2.affectedRows && result2.changedRows);

      if (output.address_success) {
        output.address_error = "地址更新成功";
      } else {
        output.code = 103;
        output.address_error = "地址更新失敗2";
      }
    } catch (ex) {
      output.code = 101;
      output.address_error = ex;
    }
  }

  // 更新 user
  let users = { ...req.body.users };

  // 加入更新時間
  const last_modified_at = moment(new Date());
  users.last_modified_at = last_modified_at.isValid()
    ? last_modified_at.format(dateTimeFormat)
    : null;

  // 驗證 birthday 日期格式
  const birthday = moment(users.birthday); //用moment去驗證是否為空字串
  users.birthday = birthday.isValid() ? birthday.format(dateFormat) : null;

  // 寫入修改人員 0 = 會員
  users.last_modified_by = 0;

  try {
    const sql = "UPDATE `users` SET ? WHERE user_id=? ";
    const [result] = await db.query(sql, [users, id]);
    output.result = result;
    output.success = !!(result.affectedRows && result.changedRows);
  } catch (ex) {
    output.error = ex;
  }

  res.json(output);
});

// 處理 register 註冊的api
router.post("/register", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    error: "",
    result: {},
  };

  // TODO 欄位資料的檢查

  let body = { ...req.body };
  body.password = await bcrypt.hash(body.password, 12);

  try {
    const sql = "INSERT INTO users SET ?";
    const [result] = await db.query(sql, [body]);
    output.success = true;
    output.result = result;
  } catch (ex) {
    output.code = 440;
    console.error(ex);
    if (ex.errno === 1062) {
      output.code = 450;
      output.error = "Email已被註冊，請試試其他Email";
    }
  }

  res.json(output);
});

// forgot-password 忘記密碼的api
router.post("/forgot-password", async (req, res) => {
  const output = {
    success: false,
    error: "",
    data: {},
  };

  const { account } = req.body;

  const otpCode = await createOtp(account);

  if (!otpCode.success) {
    return res.json(otpCode);
  }

  // 寄送 email
  const mailOptions = {
    from: `"support"<${process.env.SMTP_TO_EMAIL}>`,
    to: account,
    subject: "重置您的密碼 - OTP 認證碼",
    text: `
      親愛的用戶，

      您收到這封郵件是因為您請求了密碼重置。請使用以下一次性密碼 (OTP) 完成您的密碼重置流程：

      OTP 認證碼：${otpCode.data}

      此認證碼將在 10 分鐘內有效。請勿將此認證碼告訴他人。如非您本人操作，請忽略此郵件，您的帳號仍然是安全的。

      感謝您的使用！

      祝您順利，


      悄瞧 knock knock   團隊
    `,
  };

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      output.success = false;
      output.error = err;
      console.log(output, "false");
      return res.status(400).json(output);
    } else {
      output.success = true;
      console.log(output, "true");
      return res.json(output);
    }
  });
});

router.post("/google-login", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    error: "",
    data: {
      id: 0,
      nickname: "",
      avatar: "",
      token: "",
    },
  };

  // 沒有google登入資料
  if (!req.body.providerId || !req.body.uid) {
    output.success = false;
    output.code = 400;
    output.error = "缺少google登入資料";
    return res.json(output);
  }

  const { displayName, email, uid, phoneNumber } = req.body;

  // 1. 先查詢資料庫是否有同google_uid的資料
  try {
    const sql_google_uid = "SELECT * FROM users WHERE google_uid=?";
    const [rows] = await db.query(sql_google_uid, [uid]);

    if (!rows.length) {
      //  2-1.不存在 -> 建立一個新會員資料(無帳號與密碼)，只有google來的資料 -> 執行登入工作
      const data = {
        account: email,
        name: displayName,
        nick_name: displayName,
        mobile_phone: phoneNumber,
        google_uid: uid,
      };
      try {
        const sql = "INSERT INTO users SET ?";
        const [result] = await db.query(sql, [data]);
        if (!result.affectedRows) {
          output.code = 441;
          output.error = "預期外的錯誤，請聯絡管理員";
          return res.json(output);
        }
      } catch (ex) {
        output.code = 440;
        output.error = "預期外的錯誤，請聯絡管理員";
        console.error(ex);
        if (ex.errno === 1062) {
          output.code = 450;
          output.error = "Email已被註冊，請試試其他Email";
        }
        return res.json(output);
      }
    }
  } catch (ex) {
    output.error = ex;
  }

  try {
    const sql_google_uid = "SELECT * FROM users WHERE google_uid=?";
    const [rows] = await db.query(sql_google_uid, [uid]);

    //  有存在 -> 執行登入工作
    output.success = true;
    const payload = {
      id: rows[0].user_id,
      account: rows[0].account,
    };
    const token = jwt.sign(payload, process.env.JWT_KEY);

    output.data = {
      id: rows[0].user_id,
      nickname: rows[0].nick_name,
      avatar: rows[0].avatar,
      token,
    };
  } catch (ex) {
    output.code = 460;
    output.error = "預期外的錯誤，請聯絡管理員";
    console.error(ex);
    return res.json(output);
  }

  return res.json(output);
});

// 處理刪除的api
// router.delete("/api/:sid", async (req, res) => {
//   const output = {
//     success: false,
//     code: 0,
//     result: {},
//   };

//   if (!req.my_jwt?.id) {
//     output.code = 470;
//     return res.json(output);
//   }

//   const sid = +req.params.sid || 0;
//   if (!sid) {
//     output.code = 480;
//     return res.json(output);
//   }

//   const sql = `DELETE FROM address_book WHERE sid=${sid}`;
//   const [result] = await db.query(sql);
//   output.result = result;
//   output.success = !!result.affectedRows;

//   res.json(output);
// });

// 上傳 avatar 的api
router.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
  const output = {
    success: false,
    error: "",
    file: req.file,
  };
  console.log(req.body, req.file);
  if (!req.file) {
    output.error = "上傳失敗";
    return res.json(output);
  }

  try {
    const sql = "UPDATE users SET avatar=? WHERE user_id=?";
    const [result] = await db.query(sql, [req.file.filename, req.body.user_id]);
    output.success = !!result.affectedRows;
    if (!output.success) {
      output.error = "更新失敗";
      return res.json(output);
    }
  } catch (ex) {
    output.error = ex;
  }

  output.file = req.file;
  return res.json(output);
});

export default router;
