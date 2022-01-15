const express = require("express");
const router = express.Router();
const {
  getAllProductsInWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
} = require("../controllers/wishlist.controller");
const { auth } = require("../middleware/auth");

router.get("/", auth, getAllProductsInWishlist);
router.post("/", auth, addProductToWishlist);
router.delete("/:productID", auth, removeProductFromWishlist);

module.exports = router;
