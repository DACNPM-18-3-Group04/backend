const { DistrictServiceClient, ProvinceServiceClient } = require('../clients');
const { metadata } = require('../helper');

const getDistrictById = ({ id }) =>
  new Promise((resolve, reject) => {
    DistrictServiceClient.getDistrictById({ id }, metadata, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(res);
    });
  });

const getDistricts = () =>
  new Promise((resolve, reject) => {
    DistrictServiceClient.districts({}, metadata, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(res.items);
    });
  });

const getProvinceById = ({ id }) =>
  new Promise((resolve, reject) => {
    ProvinceServiceClient.getProvinceById({ id }, metadata, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(res);
    });
  });

const getProvinces = () =>
  new Promise((resolve, reject) => {
    ProvinceServiceClient.provinces({}, metadata, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(res.items);
    });
  });

const upsertDistrict = ({ districtName, provinceId, id }) =>
  new Promise((resolve, reject) => {
    DistrictServiceClient.upsertDistrict(
      { districtName, provinceId, id },
      metadata,
      (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(res);
      },
    );
  });

const removeDistrict = ({ id }) =>
  new Promise((resolve, reject) => {
    DistrictServiceClient.removeDistrict({ id }, metadata, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(res);
    });
  });

const upsertProvince = ({ provinceName, id }) =>
  new Promise((resolve, reject) => {
    ProvinceServiceClient.upsertProvince(
      { provinceName, id },
      metadata,
      (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(res);
      },
    );
  });

const removeProvince = ({ id }) =>
  new Promise((resolve, reject) => {
    ProvinceServiceClient.removeProvince({ id }, metadata, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(res);
    });
  });

const DistrictServiceRPC = {
  getDistrictById,
  getDistricts,
  upsertDistrict,
  removeDistrict,
};

const ProvinceServiceRPC = {
  getProvinceById,
  getProvinces,
  upsertProvince,
  removeProvince,
};

module.exports = { DistrictServiceRPC, ProvinceServiceRPC };
