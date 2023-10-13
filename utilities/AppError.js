// create custom error, inherit built in error
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; //if starts with 4 then the error comes from the user
    this.isOperational = true; //the error is operational
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
