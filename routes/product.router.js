const express = require("express");
const {
  getAllProducts,
  postProduct,
  getProductById,
} = require("../controllers/product.controller");
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", postProduct);
router.get("/:productID", getProductById);

module.exports = router;
