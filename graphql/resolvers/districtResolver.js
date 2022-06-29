const {
  DistrictServiceRPC,
} = require('../../grpc.client/services/location.services');
const isAdminUser = require('./helper');

const districtResolver = {
  Query: {
    getDistrictById: async (_, args) => {
      try {
        const res = await DistrictServiceRPC.getDistrictById({ id: args.id });
        return {
          success: true,
          data: res,
          message: 'Fetched ok',
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
        };
      }
    },
    districts: async () => {
      try {
        const res = await DistrictServiceRPC.getDistricts();
        console.log(res);
        return {
          success: true,
          data: res,
          message: 'Fetched ok',
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
        };
      }
    },
  },
  Mutation: {
    upsertDistrict: async (_, args, context) => {
      if (!isAdminUser(context.user))
        throw new Error('Thiếu quyền thực hiện hành động');

      try {
        const res = await DistrictServiceRPC.upsertDistrict({
          id: args.id,
          districtName: args.districtName,
          provinceId: args.provinceId,
        });
        return {
          success: true,
          data: res.district,
          message: res.message,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
        };
      }
    },
    removeDistrict: async (_, args, context) => {
      if (!isAdminUser(context.user))
        throw new Error('Thiếu quyền thực hiện hành động');

      try {
        const res = await DistrictServiceRPC.removeDistrict({
          id: args.id,
        });
        return {
          success: res.success,
          message: res.message,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
        };
      }
    },
  },
  District: {
    province: (root, args, context) =>
      context.provinceLoader.load(root.provinceId),
  },
};

module.exports = districtResolver;
