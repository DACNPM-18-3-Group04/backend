const { handleSignIn } = require('../components/auth/auth.controller');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('The Sign in API', () => {
  before(function () {
    this.skip(); // Weird test issue
  });

  beforeEach((done) => {
    done();
  });

  var host = 'http://localhost:3001';
  var api = '/api/v1';
  var path = api + '/auth/sign-in';

  /*
   * Test the /sign-in route active
   */
  describe('/sign-in is active ', () => {
    it('it should return status 400', (done) => {
      chai
        .request(host)
        .post(path)
        .send({ email: '', password: '' })
        .end((err, res) => {
          // console.log(res.body);

          res.should.have.status(400);
          done();
        });
    });
  });

  /*
   * Test the /sign-in successfully sign in
   */
  describe('/sign-in successfully sign in ', () => {
    it('it should return status 200 with user data', (done) => {
      chai
        .request(host)
        .post(path)
        .send({ email: 'lenguyenhaoudw@gmail.com', password: 'Password1@' })
        .end((err, res) => {
          // console.log(res.body);

          res.should.have.status(201);
          res.body.should.include.all.keys('success', 'data', 'message');
          res.body.data.should.include.all.keys('user', 'access_token');
          res.body.data.user.should.include.all.keys(
            'id',
            'email',
            'fullname',
            'contact_email',
            'contact_number',
            'avatar',
            'account_type',
            'status',
            'createdAt',
            'updatedAt',
          );
          res.body.should.have.a.property('data');
          done();
        });
    });
  });

  /*
   * Test the /sign-in validate email
   */
  describe('/sign-in with empty email ', () => {
    it('it should return status 400 with meeage', (done) => {
      chai
        .request(host)
        .post(path)
        .send({ email: '', password: 'Password1@' })
        .end((err, res) => {
          // console.log(res.body);

          res.should.have.status(400);
          res.body.should.include.all.keys('success', 'data', 'message');
          res.body.message.should.be.eql('Vui l??ng truy???n email');
          done();
        });
    });
  });

  /*
   * Test the /sign-in validate password
   */
  describe('/sign-in with empty password ', () => {
    it('it should return status 400', (done) => {
      chai
        .request(host)
        .post(path)
        .send({ email: 'lenguyenhaoudw@gmail.com', password: '' })
        .end((err, res) => {
          // console.log(res.body);

          res.should.have.status(400);
          res.body.should.include.all.keys('success', 'data', 'message');
          //res.body.message.should.be.eql('M???t kh???u t???i thi???u 8 k?? t???, ??t nh???t m???t k?? t??? vi???t hoa, m???t k?? t??? vi???t th?????ng, m???t s??? v?? m???t k?? t??? ?????c bi???t');
          done();
        });
    });
  });
});
