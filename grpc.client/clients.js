const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { auth_mservice } = require('../configs/default.config');
const protoloaderOptions = require('../configs/protoloader.config');
const PROTO_PATH = './configs/protos/index.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, protoloaderOptions);
const location_proto = grpc.loadPackageDefinition(packageDefinition).location;
const { DistrictService, ProvinceService } = location_proto;

const DistrictServiceClient = new DistrictService(
  auth_mservice.grpc_host,
  grpc.credentials.createInsecure(),
  // // grpc.credentials.createSsl(),
  {
    'grpc.keepalive_time_ms': 5000,
    'grpc.keepalive_timeout_ms': 5000,
    'grpc.keepalive_permit_without_calls': 1,
  },
);

const ProvinceServiceClient = new ProvinceService(
  auth_mservice.grpc_host,
  grpc.credentials.createInsecure(),
  // // grpc.credentials.createSsl(),
  {
    'grpc.keepalive_time_ms': 5000,
    'grpc.keepalive_timeout_ms': 5000,
    'grpc.keepalive_permit_without_calls': 1,
  },
);

module.exports = { DistrictServiceClient, ProvinceServiceClient };
