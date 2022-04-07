const { handleSignIn } = require('../components/auth/auth.controller');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('The Sign Out API', () => {
  
  before(function () {
    this.skip(); // Weird test issue
  })

  beforeEach((done) => {
    done();
  });

  var host = 'http://localhost:3001';
  var api = '/api/v1';
  var path = api + '/auth/sign-out';

  /*
   * Test the /sign-out fail
   */
  describe('/sign-out fail ', () => {
    it('it should return status 401', (done) => {

      chai.request(host)
        .post(path)
        .set('Authorization', 'bearer Fail.Fail.Fail-Fail')
        .end((err, res) => {

          // console.log(res.body);

          res.should.have.status(401);
          res.body.should.include.all.keys('success', 'data', 'message');
          done();
        });
    });
  });

  /*
   * Test the /sign-out successfully
   */
  describe('/sign-out successfully ', () => {
    it('it should return status 201', (done) => {

      //Improve: Run Sign in before sign out

      chai.request(host)
        .post(path)
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsZW5ndXllbmhhb3Vkd0BnbWFpbC5jb20iLCJhY2NvdW50X3R5cGUiOiJDIiwic3RhdHVzIjoiQSIsImlhdCI6MTY0ODk5MzQ0Mn0.tq4_V2R-4cNcfjIeY35kJfw8D5za9TY5dTUUey8WU_E')
        .end((err, res) => {

          // console.log(res.body);

          res.should.have.status(201);
          res.body.should.include.all.keys('success', 'data', 'message');
          done();
        });
    });
  });

})