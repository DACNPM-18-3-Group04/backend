const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const protoLoaderOptions = require('../../../../configs/protoloader.config');
const PROTO_PATH = './configs/protos/authService.proto';

const { auth_mservice: Auth } = require('../../../../configs/default.config');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, protoLoaderOptions);
const { AuthService } = grpc.loadPackageDefinition(packageDefinition);

const AuthMServiceClient = new AuthService(
  Auth.host,
  grpc.credentials.createInsecure(),
  // grpc.credentials.createSsl(),
  {
    'grpc.keepalive_time_ms': 5000,
    'grpc.keepalive_timeout_ms': 5000,
    'grpc.keepalive_permit_without_calls': 1,
  },
);

module.exports = AuthMServiceClient;
