const DataLoader = require('dataloader');
const {
  ProvinceServiceRPC,
  DistrictServiceRPC,
} = require('../../grpc.client/services/location.services');

const provinceLoader = new DataLoader(async (keys) => {
  const provinces = await ProvinceServiceRPC.getProvinces();
  const provinceMap = {};

  provinces.forEach((p) => {
    provinceMap[p.id] = p;
  });

  return keys.map((key) => provinceMap[key]);
});

const districtLoader = new DataLoader(async (keys) => {
  const districts = await DistrictServiceRPC.getDistricts();
  const districtMap = {};

  districts.forEach((d) => {
    districtMap[d.provinceId] = districtMap[d.provinceId]
      ? districtMap[d.provinceId].concat(d)
      : [].concat(d);
  });

  return keys.map((key) => districtMap[key]);
});

module.exports = { provinceLoader, districtLoader };
