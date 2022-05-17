const { PropertyImage, Property } = require('../../../models');
const { handle, isEmpty } = require('../../../utils/helpers');

const create = async ({ propertyId = '', link = '', publicId = '' }) => {
  const [property, errProperty] = await handle(
    Property.findOne({
      where: {
        id: propertyId,
      },
    }),
  );

  if (errProperty) throw errProperty;
  if (isEmpty(property)) {
    throw new Error(`Tin rao BĐS không tồn tại (id: ${propertyId})`);
  }

  return PropertyImage.create({
    image_link: link,
    public_id: publicId,
    property_id: propertyId,
  });
};

module.exports = create;
