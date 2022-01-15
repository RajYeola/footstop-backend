const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartSchema = new Schema({
  _id: Schema.Types.ObjectId,
  products: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Product" },
      qty: Number,
    },
  ],
});

const Cart = model("Cart", cartSchema);

module.exports = Cart;
