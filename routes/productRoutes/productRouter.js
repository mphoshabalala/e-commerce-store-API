const express = require("express");
const multer = require("multer");
const productsController = require("./../../controllers/productsController");

const router = express.Router();

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(
    productsController.upload.single("image"),
    productsController.createProduct
  );
router
  .route("/:id")
  .get(productsController.getProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = router;
