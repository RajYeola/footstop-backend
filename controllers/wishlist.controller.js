const Wishlist = require("../models/wishlist.model");

const getAllProductsInWishlist = async (req, res) => {
  try {
    const { userID } = req.user;
    const wishlist = await Wishlist.findById(userID).populate("products._id");

    if (wishlist) {
      res.json({ success: true, wishlist });
    } else {
      res.json({ success: true, wishlist: { products: [] } });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Couldn't access wishlist products",
      errorMessage: error.message,
    });
  }
};

const addProductToWishlist = async (req, res) => {
  try {
    const { userID } = req.user;
    const product = req.body;

    const user = await Wishlist.findById(userID);

    if (!user) {
      const newWishlist = new Wishlist({
        _id: userID,
        products: [{ _id: product._id }],
      });

      await newWishlist.save();

      res.json({
        success: true,
        message: "Created new wishlist and added product to the wishlist",
        newWishlist,
      });
    } else {
      const newProduct = { _id: product._id };
      user.products.push(newProduct);
      await user.save();

      res.json({ success: true, message: "Added product to wishlist", user });
    }

    // user.products.push(product);
  } catch (error) {
    res.json({
      success: false,
      message: "Error adding product to wishlist",
      errorMessage: error.message,
    });
  }
};

const removeProductFromWishlist = async (req, res) => {
  try {
    const { productID } = req.params;
    const { userID } = req.user;

    const user = await Wishlist.findById(userID);
    await user.products.remove(productID);
    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    res.json({
      success: false,
      message: "Unable to remove product from wishlist",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  getAllProductsInWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
};
