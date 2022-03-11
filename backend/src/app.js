const express = require("express");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const productRouter = require("./routes/product");


const app = express();

app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(productRouter);

module.exports = app