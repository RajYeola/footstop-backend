const Cart = require("../models/cart.model");

const getAllProductsInCart = async (req, res) => {
  try {
    const { userID } = req.user;
    const cart = await Cart.findById(userID).populate("products._id");
    if (cart) {
      res.json({ success: true, cart });
    } else {
      res.json({ success: true, cart: { products: [] } });
    }
  } catch (error) {
    res.json({ error });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { userID } = req.user;
    const product = req.body;

    const user = await Cart.findById(userID);

    if (!user) {
      const newCart = new Cart({
        _id: userID,
        products: [{ _id: product._id, qty: 1 }],
      });
      await newCart.save();

      res.json({
        success: true,
        message: "Created new cart and added the product",
      });
    } else {
      const newProduct = { _id: product._id, qty: 1 };
      user.products.push(newProduct);
      await user.save();

      res.json({ success: true, message: "New product added to cart" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Cannot add product to cart",
      errorMessage: error.message,
    });
  }
};

const updateProductInCart = async (req, res) => {
  try {
    const { userID } = req.user;
    const reqBody = req.body;
    const { productID } = req.params;

    const user = await Cart.findById(userID);

    user.products.map((product) => {
      if (String(product._id) === productID) {
        return (product["qty"] = reqBody["qty"]);
      }
      return product;
    });

    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const { userID } = req.user;
    const { productID } = req.params;

    const user = await Cart.findById(userID);
    await user.products.remove(productID);
    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    res.json({
      success: false,
      message: "Cannot delete product from cart",
      errorMessage: error.message,
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const { userID } = req.user;

    const user = await Cart.findById(userID);
    console.log(user.products);
    await user.products.remove({});
    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    res.json({
      success: false,
      message: "Cannot clear cart",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  getAllProductsInCart,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  clearCart,
};
