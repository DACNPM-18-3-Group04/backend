/* eslint-disable no-throw-literal */
/* eslint-disable no-plusplus */
const { handle } = require('../../../utils/helpers');
const PropertyRepository = require('../repository')

const handleGetPropertyById = async ({ id, userID }) => {
  const [property, errorProperty] = await handle(
    PropertyRepository.getPropertyById({id,userID})
  );
  
  if(errorProperty) throw errorProperty;
  if (!property) {
    throw 'Not found';
  }

  // get rating for the author of this property
  const author_id = property.author_id;
  const [author_reviews, errAuthor_reviews] = await handle(
    PropertyRepository.getPropertyByAuthorId({author_id})
  );

  if(errAuthor_reviews) throw errAuthor_reviews;

  return {
    reviews: author_reviews.length && author_reviews[0],
    property,
  };
};

module.exports = handleGetPropertyById;
