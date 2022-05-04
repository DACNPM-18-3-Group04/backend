const {
  //
  UserWishlist,
} = require('../../../models');
const { isEmpty, handle } = require('../../../utils/helpers');
const WishlistStatus = require('../../../configs/constants/wishlistStatus');

const handleAddRemoveUserWishList = async (params) => {
  // Validate user permission
  const { user } = params;
  if (isEmpty(user)) {
    throw new Error('Không có quyền thực hiện hành động này');
  }

  //Check Mandatory field
  if (isEmpty(params.property_id)) {
    throw new Error('Tin không tồn tại');
  }

  var wishUpdated = {};
  //Find Current Property wishlist status
  let queryUserWishlist = {
    where: {
      user_id: user.id,
      property_id: params.property_id,
    },
  };
  let [checkWishlist, errWishlist,] = await handle(
    UserWishlist.findOne(queryUserWishlist),
  );
  if (errWishlist) throw errWishlist;

  //If UserWishlist not found - Create new to track wishlist, else update current status
  if (isEmpty(checkWishlist)) {
    //New wish param
    let paramNewWish = {
      user_id: user.id,
      property_id: params.property_id,
      status: WishlistStatus.ADDED,
    }

    let [newWish, errNewWish] = await handle(
      UserWishlist.create(paramNewWish),
    );
    if (errNewWish) throw errNewWish;
    wishUpdated = newWish;
  } else {
    //Update status Added -> Removed / Removed -> Added
    var updateParam = {
      user_id: checkWishlist.user_id,
      property_id: checkWishlist.property_id,
    }
    if (checkWishlist.status == WishlistStatus.ADDED) {
      updateParam.status = WishlistStatus.REMOVED;
    } else {
      updateParam.status = WishlistStatus.ADDED;
    }
    let [UserWishlistUpdated, errUserWishlistUpdated] = await handle(
      UserWishlist.update(updateParam, queryUserWishlist),
    );
    if (errUserWishlistUpdated) throw errUserWishlistUpdated;

    //UserWishlistUpdated returns an array with one or two elements.
    //The first element is always the number of affected rows, 
    // while the second element is the actual affected rows (only supported in postgres with options.returning true).

    //Get latest version in server
    let [wishlistUpdated, errwishlistUpdated,] = await handle(
      UserWishlist.findOne(queryUserWishlist),
    );
    if (errwishlistUpdated) throw errwishlistUpdated;
    wishUpdated = wishlistUpdated.toJSON();
  }

  return {
    ...wishUpdated,
  };
};

module.exports = handleAddRemoveUserWishList;
