const { CustomError } = require("../utils/createError");

const customError = (err, req, res, next) => {
  console.log(err);

  // Check if err object is instance of Custom error
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      ok: err.ok,
      message: err.message,
    });
  }

  res.status(500).json({
    statusCode: 500,
    ok: false,
    message: "Error from Server!",
  });
};

module.exports = customError;
