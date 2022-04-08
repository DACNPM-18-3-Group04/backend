const { handleSignIn } = require('../components/auth/auth.controller');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('The Update API', () => {
  before(function () {
    this.skip(); // Weird test issue
  });

  beforeEach((done) => {
    done();
  });

  var host = 'http://localhost:3001';
  var api = '/api/v1';
  var path = api + '/user/update';

  /*
   * Test the /update fail
   */
  describe('/update fail ', () => {
    it('it should return status 400 and message ', (done) => {
      var updatedata = {
        userId: '',
        email: '@gmail.com',
        password: 'Password1',
        fullname: 'Nguyễn Văn B',
        contact_email: 'Nguyễn Văn B',
        contact_number: 'Nguyễn Văn B',
      };

      chai
        .request(host)
        .post(path)
        .send(updatedata)
        .end((err, res) => {
          // console.log(res.body);

          res.should.have.status(400);
          res.body.should.include.all.keys('success', 'data', 'message');
          done();
        });
    });
  });

  /*
   * Test the /update successfully
   */
  describe('/update successfully ', () => {
    it('it should return status 200', (done) => {
      var updatedata = {
        userId: '',
        email: '@gmail.com',
        password: 'Password1',
        fullname: 'Nguyễn Văn B',
        contact_email: 'Nguyễn Văn B',
        contact_number: 'Nguyễn Văn B',
      };

      chai
        .request(host)
        .post(path)
        .send(updatedata)
        .end((err, res) => {
          // console.log(res.body);

          res.should.have.status(200);
          res.body.should.include.all.keys('success', 'data', 'message');
          res.body.message.should.be.eql(
            'Cập nhật thông tin tài khoản thành công',
          );
          done();
        });
    });
  });
});
