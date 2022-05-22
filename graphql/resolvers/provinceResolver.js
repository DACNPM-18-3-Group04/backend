const {
  ProvinceServiceRPC,
} = require('../../grpc.client/services/location.services');
const isAdminUser = require('./helper');

const pronviceResolver = {
  Query: {
    getProvinceById: async (_, args) => {
      try {
        const res = await ProvinceServiceRPC.getProvinceById({ id: args.id });
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
    provinces: async () => {
      try {
        const res = await ProvinceServiceRPC.getProvinces();
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
    upsertProvince: async (_, args, context) => {
      if (!isAdminUser(context.user))
        throw new Error('Thiếu quyền thực hiện hành động');

      try {
        const res = await ProvinceServiceRPC.upsertProvince({
          id: args.id,
          provinceName: args.provinceName,
        });
        return {
          success: true,
          data: res.province,
          message: res.message,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
        };
      }
    },
    removeProvince: async (_, args, context) => {
      if (!isAdminUser(context.user))
        throw new Error('Thiếu quyền thực hiện hành động');

      try {
        const res = await ProvinceServiceRPC.removeProvince({
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
  Province: {
    districts: (root, args, context) => context.districtLoader.load(root.id),
  },
};

module.exports = pronviceResolver;
