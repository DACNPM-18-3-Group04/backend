const Https = require('../https');
module.exports = PropertyService = () => {
  const https = Https('/api/v1/property');
  const handleSearchProperty = async (req, res) => {
    const { query } = req;
    https
      .find(query, '/search')
      .then(({ data }) => {
        res.status(200).json({ ...data });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          success: false,
          data: {},
          message: err.message,
        });
      });
  };

  const handleCreateProperty = async (req, res) => {
    const params = {
      user: req.user,
      ...req.body,
    };

    return await https
      .create(params)
      .then(({ data }) => {
        res.status(201).json({
          ...data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          success: false,
          data: {},
          message: err.message,
        });
      });
  };

  const handleUpdateProperty = async (req, res) => {
    const params = {
      user: req.user,
      ...req.body,
    };

    return await https
      .create(params, '/update')
      .then(({ data }) => {
        res.status(201).json({ ...data });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          success: false,
          data: {},
          message: err.message,
        });
      });
  };

  const handleGetListProperty = async (req, res) => {
    const params = req.query.page;

    return await https
      .find(params)
      .then(({ data }) =>
        res.status(200).json({
          ...data,
        }),
      )
      .catch((err) =>
        res.status(404).json({
          success: false,
          data: {},
          message: err.message,
        }),
      );
  };

  const handleGetPropertyById = async (req, res) => {
    const { query } = req;
    https
      .find(query, '/details')
      .then(({ data }) => res.status(200).json({ ...data }))
      .catch((err) =>
        res.status(404).json({
          success: false,
          data: {},
          message: err,
        }),
      );
  };

  return {
    handleSearchProperty,
    handleCreateProperty,
    handleUpdateProperty,
    handleGetListProperty,
    handleGetPropertyById,
  };
};
