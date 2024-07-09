import express from "express";
import db from "../utils/connect.js";
// import moment from "moment-timezone";
import bodyParser from "body-parser";

const router = express.Router();

router.use(bodyParser.json());
// const dateFormat = "YYYY-MM-DD HH:mm:ss";

// POST insert items into to cart_member table
router.post("/api/cart_member", async (req, res) => {
  const data = { ...req.body };
  console.log("member cart data", data);
  try {
    // 確認會員購物車是否已經有該產品
    const [existingCartItem] = await db.query(
      "SELECT * FROM cart_member WHERE cart_member_id = ? AND cart_product_id = ?",
      [data.memberId, data.productId]
    );

    const insertSql = `
      INSERT INTO cart_member (
        cart_member_id, 
        cart_product_id, 
        cart_product_quantity, 
        created_at, 
        last_modified_at
      ) VALUES (
        ?, ?, ?, now(), now()
      );
    `;

    const updateSql = `
      UPDATE cart_member
      SET cart_product_quantity = cart_product_quantity + ?, 
      last_modified_at = now()
      WHERE cart_member_id = ? AND cart_product_id = ?
    `;

    let memberCartResults;

    // 如果會員購物車已存在此商品，更新商品數量
    if (existingCartItem.length > 0) {
      const updateValues = [data.cartQty, data.memberId, data.productId];
      [memberCartResults] = await db.query(updateSql, updateValues);
    } else {
      // 如果會員購物車「不」已存在此商品，更新商品數量
      const insertValues = [data.memberId, data.productId, data.cartQty];
      [memberCartResults] = await db.query(insertSql, insertValues);
    }

    // 確認是否有成功 insert value
    const success = memberCartResults.affectedRows > 0;

    // 返回結果到前端
    res.json({
      success,
    });
  } catch (error) {
    console.error("Error while processing add to member cart:", error);
    res.status(500).json({
      error: "An error occurred while processing add to member cart.",
    });
  }
});

// GET member cart items
router.get("/cart/", async (req, res) => {
  // 從 query 中取得 member_id
  const { member_id } = req.query;

  try {
    // 取得產品資料
    const sql = `
      SELECT
        cm.id as cart_id,
        pm.product_id,
        pm.product_name,
        pm.price,
        pi.product_img,
        cm.cart_product_quantity
      FROM cart_member AS cm
      JOIN product_management AS pm
      ON pm.product_id = cm.cart_product_id
      JOIN product_img AS pi
      ON pi.img_product_id = cm.cart_product_id
      WHERE cm.cart_member_id = ?;
    `;

    const [rows] = await db.query(sql, [member_id]);

    console.log("member address: ", rows);

    // 將查詢結果傳送到前端
    res.json({
      status: true,
      rows,
    });
  } catch (error) {
    console.error("Error fetching member cart: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// after login, insert items into cart_member table
router.post("/api/cart/merge", async (req, res) => {
  const { memberId, guestCart } = req.body;

  try {
    const insertPromises = guestCart.map(async (item) => {
      const { productId, cartQty } = item;

      const [existingCartItem] = await db.query(
        "SELECT * FROM cart_member WHERE cart_member_id = ? AND cart_product_id = ?",
        [memberId, productId]
      );

      if (existingCartItem.length > 0) {
        await db.query(
          "UPDATE cart_member SET cart_product_quantity = cart_product_quantity + ?, last_modified_at = now() WHERE cart_member_id = ? AND cart_product_id = ?",
          [cartQty, memberId, productId]
        );
      } else {
        await db.query(
          "INSERT INTO cart_member (cart_member_id, cart_product_id, cart_product_quantity, created_at, last_modified_at) VALUES (?, ?, ?, now(), now())",
          [memberId, productId, cartQty]
        );
      }
    });

    await Promise.all(insertPromises);

    res.json({ success: true });
  } catch (error) {
    console.error("merge into cart_member failed:", error);
    res.status(500).json({ error: "merge into cart_member failed" });
  }
});

// GET guest cart items
router.get("/api/product", async (req, res) => {
  const { product_id } = req.query;

  try {
    // 取得產品資料
    const sql = `
      SELECT  
        pm.product_id, 
        pm.product_name,
        pm.price,
        pi.product_img
      FROM product_management as pm
      JOIN product_img as pi
      ON pi.img_product_id = pm.product_id
      WHERE product_id = ?;
    `;

    const [rows] = await db.query(sql, [product_id]);

    console.log("guest cart items: ", rows);

    // 將查詢結果傳送到前端
    res.json({
      status: true,
      rows,
    });
  } catch (error) {
    console.error("Error fetching guest cart: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT update & delete member cart items
router.put("/cart/update/:cart_id", async (req, res) => {
  const cartId = +req.params.cart_id || 0;
  const { cart_product_quantity } = req.body;

  if (!cartId) {
    return res.status(400).json({ success: false, message: "Invalid cart ID" });
  }

  if (cart_product_quantity === 0) {
    try {
      const deleteSql = `
        DELETE FROM cart_member
        WHERE id = ?
      `;

      const [deleteResult] = await db.query(deleteSql, [cartId]);
      const success = deleteResult.affectedRows > 0;

      return res.json({
        success,
        message: success
          ? "Cart item deleted successfully"
          : "Failed to delete cart item",
      });
    } catch (error) {
      console.error("Error deleting cart item:", error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to delete cart item" });
    }
  } else {
    try {
      const updateSql = `
        UPDATE cart_member SET
          cart_product_quantity = ?,
          last_modified_at = NOW()
        WHERE id = ?
      `;

      const [updateResult] = await db.query(updateSql, [
        cart_product_quantity,
        cartId,
      ]);
      const success = updateResult.affectedRows > 0;

      return res.json({
        success,
        message: success
          ? "Cart item updated successfully"
          : "Failed to update cart item",
      });
    } catch (error) {
      console.error("Error updating cart item:", error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to update cart item" });
    }
  }
});

// POST insert data into orders and order details tables, delete member's cart_member data
router.post("/api/checkout", async (req, res) => {
  const {
    memberId,
    recipientName,
    recipientMobile,
    recipientDistrictId,
    recipientAddress,
    memberInvoice,
    mobileInvoice,
    recipientTaxId,
    orderItems,
  } = req.body;

  try {
    // order_table
    const orderSql = `
      INSERT INTO orders (
        order_date,
        member_id,
        recipient_name,
        recipient_mobile,
        order_district_id,
        order_address,
        member_carrier,
        recipient_invoice_carrier,
        recipient_tax_id,
        order_status_id,
        created_at,
        last_modified_at
      ) VALUES (now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), now());
    `;

    const orderValues = [
      memberId,
      recipientName,
      recipientMobile,
      recipientDistrictId,
      recipientAddress,
      memberInvoice,
      mobileInvoice,
      recipientTaxId,
      5, // order_status_id
    ];

    const [orderResult] = await db.query(orderSql, orderValues);

    const orderId = orderResult.insertId; // 本此新增的 order_id

    // order_details table
    const orderDetailSql = `
      INSERT INTO order_details (
        order_id,
        order_product_id,
        order_quantity,
        order_unit_price,
        created_at,
        last_modified_at
      ) VALUES (?, ?, ?, ?, now(), now());
    `;

    const orderDetailPromises = orderItems.map(
      ({ productId, productOriginalPrice, orderQty }) => {
        const orderDetailValues = [
          orderId,
          productId,
          orderQty,
          productOriginalPrice,
        ];
        return db
          .query(orderDetailSql, orderDetailValues)
          .then(([result]) => result);
      }
    );

    const orderDetailResults = await Promise.all(orderDetailPromises);

    const success =
      orderResult.affectedRows === 1 &&
      orderDetailResults.length > 0 &&
      orderDetailResults.every((result) => result.affectedRows === 1);

    if (success) {
      const deleteCartSql = `DELETE FROM cart_member WHERE cart_member_id = ?`;
      await db.query(deleteCartSql, [memberId]);
    }

    // 返回结果到前端
    res.json({
      success,
      orderId,
    });
  } catch (error) {
    console.error("Error while processing checkout:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing checkout." });
  }
});

// GET member address
router.get("/", async (req, res) => {
  // 從 query 中取得 member_id, order_status_id
  const { member_id } = req.query;

  try {
    // 取得訂單資料
    const sql = `
      SELECT
        a.id,
        a.user_id,
        c.id AS city_id,
        c.city_name,
        d.id AS district_id,
        d.district_name,
        a.address,
        a.recipient_name,
        a.mobile_phone,
        a.type
      FROM address AS a
      JOIN district AS d
      ON a.district_id = d.id
      JOIN city AS c
      ON d.city_id = c.id 
      WHERE a.user_id =  ?;
    `;

    const [memberAddresses] = await db.query(sql, [member_id]);

    console.log("member address: ", memberAddresses);

    // 將查詢結果傳送到前端
    res.json({
      status: true,
      memberAddresses: memberAddresses,
    });
  } catch (error) {
    console.error("Error fetching member addresses: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST insert data into address table
router.post("/api/add_address", async (req, res) => {
  const data = { ...req.body };

  console.log(data);

  // INSERT CHECKOUT DATA INTO address table
  try {
    const sql = `
    INSERT INTO address( 
      user_id, 
      recipient_name,
      mobile_phone,
      district_id, 
      address, 
      type) VALUES (?, ?, ?, ?, ?, 0);
    `;

    const addressValues = [
      data.memberId,
      data.recipientName,
      data.recipientMobile,
      data.recipientDistrictId,
      data.recipientAddress,
    ];
    const [addressResults] = await db.query(sql, addressValues);

    console.log("Address Insert Result:", addressResults); // 後端列印結果

    // 確認是否有成功 insert value
    const success = addressResults.affectedRows === 1;
    const addressId = addressResults.insertId;

    // 返回結果到前端
    res.json({
      success,
      addressId,
    });
  } catch (error) {
    console.error("Error while processing add address from checkout:", error);
    res.status(500).json({
      error: "An error occurred while processing add address from checkout.",
    });
  }
});

// DELETE data from address table
router.delete("/api/delete_address/:addressId", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    result: {},
  };

  const aid = +req.params.addressId || 0;

  if (!aid) {
    output.code = 400;
    output.message = "Invalid address id";
    return res.status(400).json(output);
  }

  try {
    const sql = `DELETE FROM address WHERE id=?`;
    const [deleteAddressResult] = await db.query(sql, [aid]);

    if (deleteAddressResult.affectedRows === 1) {
      output.success = true;
      output.code = 200; // 成功的請求
      output.message = "Address deleted successfully";
      output.result = deleteAddressResult;
    } else {
      output.code = 404; // 找不到資源
      output.message = "Address id not found";
    }

    console.log("delete address id:" + aid);
    res.status(output.code).json(output);
  } catch (error) {
    console.error("Error deleting address:", error);
    output.code = 500; // 內部伺服器錯誤
    output.message = "An error occurred while deleting the address";
    res.status(500).json(output);
  }
});

// GET city data from cities
router.get("/api/city", async (req, res) => {
  try {
    const sql = `SELECT * FROM city`;
    const [rows] = await db.query(sql);

    res.json({
      success: true,
      rows,
    });
  } catch (error) {
    console.error("Error fetching city: ", error);
    res.status(500).json({
      success: false,
      message: "Error fetching city data",
    });
  }
});


// GET district data from cities
router.get("/api/district", async (req, res) => {
  try {
    const sql = `SELECT * FROM district`;
    const [rows] = await db.query(sql);
    const success = rows.affectedRows > 0;

    res.json({
      success: true,
      rows,
    });
  } catch (error) {
    console.error("Error fetching district: ", error);
    res.status(500).json({
      success: false,
      message: "Error fetching city data",
    });
  }
});


export default router;
