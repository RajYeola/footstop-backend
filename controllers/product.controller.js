const Product = require("../models/product.model");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json({ success: true, products });
  } catch {
    res.json({
      success: false,
      message: "Error retrieving products",
      errorMessage: error.message,
    });
  }
};

const postProduct = async (req, res) => {
  try {
    const product = req.body;
    const NewProduct = new Product(product);
    const savedProduct = await NewProduct.save();

    res.json({ success: true, product: savedProduct });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to add products",
      errorMessage: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  const { productID } = req.params;

  try {
    const product = await Product.findById(productID);

    res.json({ success: true, product });
  } catch (error) {
    res.json({
      success: false,
      message: "Error retrieving the product",
      errorMessage: error.message,
    });
  }
};

module.exports = { getAllProducts, postProduct, getProductById };
