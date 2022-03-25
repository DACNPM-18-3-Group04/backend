const handleNotFoundError = (req, res) => {
  res.status(404).json({
    success: false,
    data: {},
    message: 'Invalid URL',
  });
};

module.exports = {
  handleNotFoundError,
};
