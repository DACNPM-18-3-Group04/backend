const handleSearchProperty = async (query, page, limit) => {
  console.log(query);
  return {
    query,
    page,
    limit,
  };
};

module.exports = handleSearchProperty;
