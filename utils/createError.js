class CustomError extends Error {
  constructor(message, statusCode, ok) {
    super(message);
    this.statusCode = statusCode;
    this.ok = ok;
  }
}

const createCustomError = (message, statusCode, ok) => {
  return new CustomError(message, statusCode, ok);
};

module.exports = {
  createCustomError,
  CustomError,
};
