const express = require("express");
const morgan = require("morgan");
const path = require("path");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");
const app = express();
app.use("/images", express.static(path.join(__dirname, "images"))); // serve static files

app.use(morgan("dev")); //dev - development
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `The requested url: ${req.originalUrl} does not exist`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
