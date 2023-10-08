const Product = require("./../models/productModel");
const multer = require("multer");
const path = require("path");

exports.getAllProducts = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b{gte|gt|lte|lt}\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-ratings");
    }

    const products = await query;
    // console.log(query);

    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        message: error.message,
      },
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const imageUrl = req.file ? `/images/${req.file.filename}` : null;

    const newProduct = await Product.create({
      name,
      price,
      description,
      imageUrl,
    });
    console.log(newProduct);
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        message: error.message,
      },
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        message: error.message,
      },
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        message: error.message,
      },
    });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        message: error.message,
      },
    });
  }
};

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

exports.upload = multer({ storage: filestorageEngine });
