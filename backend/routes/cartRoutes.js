const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// Lấy giỏ hàng
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.findOne(); // Giả sử có 1 giỏ hàng (người dùng đơn)
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy giỏ hàng" });
  }
});

// Thêm sản phẩm vào giỏ
router.post("/", async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne();
    if (!cart) cart = new Cart();

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }

    const savedCart = await cart.save();
    res.json(savedCart);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm vào giỏ hàng" });
  }
});

// Thanh toán
router.post("/checkout", async (req, res) => {
  try {
    await Cart.deleteOne(); // Xóa giỏ hàng sau thanh toán
    res.json({ message: "Thanh toán thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thanh toán" });
  }
});

module.exports = router;
