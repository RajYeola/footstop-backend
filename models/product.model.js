const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  brand: String,
  category: String,
  discount: Number,
  fastDelivery: Boolean,
  image: String,
  inStock: Boolean,
  name: String,
  price: Number,
});

const Product = model("Product", productSchema);

module.exports = Product;
