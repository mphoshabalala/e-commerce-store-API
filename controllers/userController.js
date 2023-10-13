const User = require("../models/userModel");
const catchAsync = require("../utilities/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});
exports.createUser = async (req, res, next) => {};
exports.getUser = async (req, res, next) => {};
exports.updateUser = async (req, res, next) => {};
exports.deleteUser = async (req, res, next) => {};
