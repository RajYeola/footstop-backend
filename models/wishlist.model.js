const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const wishlistSchema = Schema({
  _id: Schema.Types.ObjectId,
  products: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Product" },
    },
  ],
});

const Wishlist = model("Wishlist", wishlistSchema);

module.exports = Wishlist;
