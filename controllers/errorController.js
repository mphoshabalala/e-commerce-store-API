const AppError = require("../utilities/AppError");

// send error during development staGE
const sendErrorInDevelopment = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorInProduction = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const handleJWTError = () =>
  new AppError("Invalid token, please log in again", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired, please login again", 401);
// handle error from db, with custom app error object
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400); // return app error object instantiation
};

const handleDuplicateFieldsInDB = (err) => {
  const value = err.errmsg.match(/([""])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}`;
  return new AppError(message, 400);
};

const handleValidationErrorInDB = (err) => {
  const errors = Object.values(err.errors).map((el) => {
    el.message;
  }); //extract error messages from a list of validation errors
  const message = `Invalid input data. ${errors.join(", ")}`;
  return new AppError(message, 400);
};

// handle error in production

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; //code 500 implies internal server error
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    //handle error in development
    sendErrorInDevelopment(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorInDB(error);
    if (error.name === 11000) error = handleDuplicateFieldsInDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorInProduction(error, res);
  }
};
