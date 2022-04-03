const { handleSignIn } = require('../components/auth/auth.controller');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('The Register API', () => {
  beforeEach((done) => {
    //Before each test we empty the database in your case
    done();
  });

  var host = 'http://localhost:3001';
  var api = '/api/v1';
  var path = api + '/user/register';

  /*
   * Test the /register fail
   */
  describe('/register fail ', () => {
    it('it should return status 400 and message "Đã tồn tại"', (done) => {

      chai.request(host)
        .post(path)
        .send({ email: 'lenguyenhaoudw@gmail.com', password: 'Password1', fullname: "Nguyễn Văn B"})
        .end((err, res) => {

          // console.log(res.body);

          res.should.have.status(400);
          res.body.should.include.all.keys('success', 'data', 'message');
          res.body.message.should.be.eql('Đã tồn tại email');
          done();
        });
    });
  });

  /*
   * Test the /register successfully
   */
  describe('/register successfully ', () => {
    it('it should return status 201', (done) => {

      chai.request(host)
        .post(path)
        .send({ email: 'vanngunguvan@gmail.com', password: 'Password1', fullname: "Nguyễn Văn B"})
        .end((err, res) => {

          // console.log(res.body);

          res.should.have.status(201);
          res.body.should.include.all.keys('success', 'data', 'message');
          res.body.message.should.be.eql('Đăng ký tài khoản thành công');
          done();
        });
    });
  });

})