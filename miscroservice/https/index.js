const axios = require('axios');
const utils = require('../../configs/utils/index');

module.exports = Https = (nameService = null) => {
  const DOMAIN = utils.getDomainPropertyService();
  const BASE_URL = `${DOMAIN}${nameService}`;
  const _axios = axios.create({
    baseUrl: BASE_URL,
    headers: {
      accept: 'application/json',
    },
  });

  const find = async (params, subUrl = '') => {
    try {
      return await _axios.get(`${BASE_URL}${subUrl}`, {
        params: { ...params },
      });
    } catch (error) {
      throw error;
    }
  };
  const get = async (params, subUrl = '') => {
    return await _axios.get(`${BASE_URL}${subUrl}`, { params: { ...params } });
  };
  const create = async (data, subUrl = '') => {
    try {
      return await _axios.post(`${BASE_URL}${subUrl}`, { ...data });
    } catch (error) {
      throw error;
    }
  };
  const update = async (data, subUrl = '') => {
    return await _axios.put(`${BASE_URL}${subUrl}`, data);
  };
  const patch = async (data, subUrl = '') => {
    return await _axios.patch(`${BASE_URL}${subUrl}`, data);
  };
  const remove = async (id, subUrl = '') => {
    return await _axios.delete(`${BASE_URL}${subUrl}`, id);
  };

  return { find, get, create, update, patch, remove };
};
