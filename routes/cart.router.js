const express = require("express");
const router = express.Router();
const {
  getAllProductsInCart,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  clearCart,
} = require("../controllers/cart.controller");
const { auth } = require("../middleware/auth");

router.get("/", auth, getAllProductsInCart);
router.post("/", auth, addProductToCart);
router.delete("/", auth, clearCart);
router.post("/:productID", auth, updateProductInCart);
router.delete("/:productID", auth, deleteProductFromCart);

module.exports = router;
