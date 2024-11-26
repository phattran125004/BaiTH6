const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  prdName: { type: String, required: true },
  price: { type: Number, required: true },
  prdImage: { type: String, required: true },
  description: { type: String },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
