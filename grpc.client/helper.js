const grpc = require('@grpc/grpc-js');
const defaultConfig = require('../configs/default.config');
const { auth_mservice: ServiceConfig } = defaultConfig;

const getMetadata = () => {
  const meta = new grpc.Metadata();
  meta.add(ServiceConfig.auth_header, ServiceConfig.secret_key);

  return meta;
};

module.exports = {
  metadata: getMetadata(),
};
