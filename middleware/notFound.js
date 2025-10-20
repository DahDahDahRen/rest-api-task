const notFound = (req, res) => {
  res.status(404).json({
    status: 404,
    ok: false,
    message: "Route does not exist!",
  });
};

module.exports = notFound;
