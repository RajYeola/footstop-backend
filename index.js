const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const productRouter = require("./routes/product.router");
const cartRouter = require("./routes/cart.router");
const userRouter = require("./routes/user.router");
const wishlistRouter = require("./routes/wishlist.router");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/user", userRouter);
app.use("/wishlist", wishlistRouter);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    })
  )
  .catch((error) => console.log(error.message));
