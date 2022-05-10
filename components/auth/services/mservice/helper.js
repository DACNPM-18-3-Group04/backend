const grpc = require('@grpc/grpc-js');
const config = require('../../../../configs/default.config');
const { auth_mservice: ServiceConfig } = config;

const getMetadata = () => {
  const meta = new grpc.Metadata();
  meta.add(ServiceConfig.auth_header, ServiceConfig.secret_key);

  return meta;
};

module.exports = {
  getMetadata,
  metadata: getMetadata(),
};
