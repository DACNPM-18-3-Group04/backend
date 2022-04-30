const {
  //
  UserWishlist,
  Property,
} = require('../../../models');
const { isEmpty, handle } = require('../../../utils/helpers');
const WishlistStatus = require('../../../configs/constants/wishlistStatus');
const db = require('../../../configs/database');

const handleGetWishlist = async (params) => {
  // Validate user permission
  const { user } = params;
  if (isEmpty(user)) {
    throw new Error('Không có quyền thực hiện hành động này');
  }

  let queryUserWishlist = {
    where: {
      user_id: user.id,
    },
    include: Property,
  };

  let [wishlist, errWishlist,] = await handle(
    UserWishlist.findAll({
      include: { model: Property, required: true },
      where: {
        user_id: user.id,
      }
    }),
  );
  if (errWishlist) throw errWishlist;

  return {
    ...user,
    UserWishList: wishlist,
  };
};

module.exports = handleGetWishlist;
