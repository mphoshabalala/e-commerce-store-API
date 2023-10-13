const express = require("express");
const multer = require("multer");
const productsController = require("../controllers/productsController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(
    authController.protect,
    productsController.upload,
    productsController.createProduct
  );
router
  .route("/:id")
  .get(productsController.getProduct)
  .patch(authController.protect, productsController.updateProduct)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "developer"),
    productsController.deleteProduct
  );

module.exports = router;
