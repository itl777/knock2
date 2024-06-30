import express from "express";
import db from "../utils/connect.js";
// import moment from "moment-timezone";
import bodyParser from "body-parser";

const router = express.Router();

router.use(bodyParser.json());
// const dateFormat = "YYYY-MM-DD HH:mm:ss";


// POST insert items into to cart_member
router.post("/api/member_cart", async (req, res) => {
  const data = { ...req.body };
  console.log("member cart data", data);
  try {
    const sql = `
      INSERT INTO cart_member (
        cart_member_id, 
        cart_product_id, 
        cart_product_quantity, 
        created_at, 
        last_modified_at) 
      VALUES (
        ?,
        ?,
        ?,
        now(),
        now()
        );
    `;
    const memberCartValues = [data.memberId, data.productId, data.cartQty];
    const [memberCartResults] = await db.query(sql, memberCartValues);

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

    const [memberCart] = await db.query(sql, [member_id]);

    console.log("member address: ", memberCart);

    // 將查詢結果傳送到前端
    res.json({
      status: true,
      memberCart: memberCart,
    });

  } catch (error) {
    console.error("Error fetching member cart: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT update member cart items
// router.put("/cart/update/:cart_id", express.json(), async (req, res) => {
//   const cartId = +req.params.cart_id || 0;
//   const { cart_product_quantity } = req.body;

//   if (!cartId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid cart ID", cartId });
//   }

//   if (typeof cart_product_quantity !== "number") {
//     return res
//       .status(400)
//       .json({
//         success: false,
//         message: "Invalid quantity",
//         cart_product_quantity,
//       });
//   }

//   try {
//     const sql = `
//       UPDATE cart_member SET
//         cart_product_quantity = ?,
//         last_modified_at = NOW()
//       WHERE id = ?
//     `;

//     const [cartResult] = await db.query(sql, [cart_product_quantity, cartId]);
//     const success = !!(cartResult.affectedRows && cartResult.changedRows);

//     res.json({
//       success,
//       cartId,
//       cartResult,
//     });
//   } catch (error) {
//     console.error("Error updating cart:", error);
//     res.status(500).json({ success: false, error: "Failed to update cart" });
//   }
// });

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


// POST insert data into orders and order details tables
router.post("/api/checkout", async (req, res) => {
  const {
    memberId,
    recipientName,
    recipientMobile,
    recipientDistrictId,
    recipientAddress,
    paymentMethod,
    memberInvoice,
    mobileInvoice,
    recipientTaxId,
    orderItems,
  } = req.body;

  // INSERT CHECKOUT DATA INTO order_details table
  try {
    const orderSql = `
      INSERT INTO orders (
        order_date,
        member_id,
        recipient_name,
        recipient_mobile,
        order_district_id,
        order_address,
        payment_method,
        member_carrier, 
        recipient_invoice_carrier,
        recipient_tax_id,
        order_status_id,
        created_at,
        last_modified_at
      ) VALUES (now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), now());
    `;

    const orderValues = [
      memberId,
      recipientName,
      recipientMobile,
      recipientDistrictId,
      recipientAddress,
      paymentMethod,
      memberInvoice,
      mobileInvoice,
      recipientTaxId,
      5, // order_status_id
    ];

    const [orderResult] = await db.query(orderSql, orderValues);

    //console.log("Order Insert Result:", orderResult); // 後端列印結果

    // INSERT ITEM INTO order_details table
    const orderId = orderResult.insertId; // 取得本次的 order_id
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
          .then(([result]) => result); // 只返回查詢結果（忽略 undefined）
      }
    );

    const orderDetailResults = await Promise.all(orderDetailPromises);

    // 後端列印結果
    // orderDetailResults.forEach((v, i) =>
    //   console.log(`Order Detail Insert Result ${i}:`, v)
    // );

    // 確認是否有成功 insert value
    const success =
      orderResult.affectedRows === 1 &&
      orderDetailResults.length > 0 &&
      orderDetailResults.every((result) => result.affectedRows === 1);

    // 返回結果到前端
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
    res
      .status(500)
      .json({
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



// 成立訂單後刪除購物車內容
// router.post("/api/checkout", async (req, res) => {
//   const {
//     memberId,
//     recipientName,
//     recipientMobile,
//     recipientDistrictId,
//     recipientAddress,
//     paymentMethod,
//     memberInvoice,
//     mobileInvoice,
//     recipientTaxId,
//     orderItems,
//   } = req.body;

//   try {
//     // 插入订单信息到 orders 表
//     const orderSql = `
//       INSERT INTO orders (
//         order_date,
//         member_id,
//         recipient_name,
//         recipient_mobile,
//         order_district_id,
//         order_address,
//         payment_method,
//         member_carrier,
//         recipient_invoice_carrier,
//         recipient_tax_id,
//         order_status_id,
//         created_at,
//         last_modified_at
//       ) VALUES (now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), now());
//     `;

//     const orderValues = [
//       memberId,
//       recipientName,
//       recipientMobile,
//       recipientDistrictId,
//       recipientAddress,
//       paymentMethod,
//       memberInvoice,
//       mobileInvoice,
//       recipientTaxId,
//       5, // order_status_id
//     ];

//     const [orderResult] = await db.query(orderSql, orderValues);

//     const orderId = orderResult.insertId; // 获取本次的 order_id
//     const orderDetailSql = `
//       INSERT INTO order_details (
//         order_id,
//         order_product_id,
//         order_quantity,
//         order_unit_price,
//         created_at,
//         last_modified_at
//       ) VALUES (?, ?, ?, ?, now(), now());
//     `;

//     const orderDetailPromises = orderItems.map(
//       ({ productId, productOriginalPrice, orderQty }) => {
//         const orderDetailValues = [
//           orderId,
//           productId,
//           orderQty,
//           productOriginalPrice,
//         ];
//         return db
//           .query(orderDetailSql, orderDetailValues)
//           .then(([result]) => result);
//       }
//     );

//     const orderDetailResults = await Promise.all(orderDetailPromises);

//     const success =
//       orderResult.affectedRows === 1 &&
//       orderDetailResults.length > 0 &&
//       orderDetailResults.every((result) => result.affectedRows === 1);

//     if (success) {
//       // 删除购物车中的所有商品
//       const deleteCartSql = `DELETE FROM cart_member WHERE member_id = ?`;
//       await db.query(deleteCartSql, [memberId]);
//     }

//     // 返回结果到前端
//     res.json({
//       success,
//       orderId,
//     });
//   } catch (error) {
//     console.error("Error while processing checkout:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while processing checkout." });
//   }
// });




export default router;
