const express = require("express");
const morgan = require("morgan");
const path = require("path");
const productRouter = require("./routes/productRoutes/productRouter");
const app = express();
app.use("/images", express.static(path.join(__dirname, "images"))); // serve static files

app.use(morgan("dev")); //dev - development
app.use(express.json());
app.get("/", (req, res) => {
  res.send("we here");
});

app.use("/api/v1/products", productRouter);

module.exports = app;
