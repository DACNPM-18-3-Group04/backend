const {
    Property,
    PropertyImage,
    District,
    Province,
    User,
    UserWishlist,
} = require('../../../models');

const getPropertyById = async({id,userID}) =>{
    return Property.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: PropertyImage,
            as: 'images',
            attributes: ['id', 'image_link'],
          },
          {
            model: District,
            include: Province,
            attributes: ['id', 'name'],
          },
          {
            model: User,
            attributes: [
              'id',
              'email',
              'fullname',
              'avatar',
              'status',
              'contact_email',
              'contact_number',
            ],
            required: false,
          },
          {
            model: UserWishlist,
            required: false,
            attributes: ['status'],
            where: {
              user_id: userID,
            },
          },
        ],
      }
    );
}

module.exports = getPropertyById;
