const Product = require("./../models/productModel");
const multer = require("multer");
const path = require("path");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/AppError");
const APIFeatures = require("../utilities/APIFeatures");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;
  // console.log(query);

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
});

exports.createProduct = catchAsync(async (req, res) => {
  const { name, price, description } = req.body;
  const imageUrl = req.file ? `/images/${req.file.filename}` : null;
  console.log(imageUrl);

  const newProduct = await Product.create({
    name,
    price,
    description,
    imageUrl,
  });
  console.log("PRODUCT: ", newProduct);
  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return next(new AppError("No product found with that ID ", 404));
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) next(new AppError("No product found with that ID", 404));
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const filestorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
  },
});

exports.upload = multer({ storage: filestorageEngine }).single("image");
