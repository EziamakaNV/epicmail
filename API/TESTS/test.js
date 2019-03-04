/* eslint-disable no-undef */
const chai = require('chai');

const chaiHttp = require('chai-http');

const server = require('../server');

const { expect } = chai;

chai.use(chaiHttp);

// eslint-disable-next-line no-undef
describe('POST /api/v1/auth/signup', () => {
  // eslint-disable-next-line no-undef
  describe('handle valid input', () => {
    // eslint-disable-next-line no-undef
    it('should return an object with properties "status" and "data" on sucess', (done) => { // Mocha done callback for asynchronous tests
      chai.request(server)
        .post('/api/v1/auth/signup')
        .type('form')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          userName: 'johnnyDoe',
          password: 'secret',
        })
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          // eslint-disable-next-line no-unused-expressions
          expect(res.body).to.be.a('object');
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('data');
          expect(res.body.data).to.be.a('object');
          done();
        });
    });
  });

  describe('handles invalid input', () => {
    it('should not be able to post if all the parameters are not present', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .type('form')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          userName: 'johnnyDoe',
        })
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('error');
          expect(res.body.error).to.be.a('string');
          done();
        });
    });
  });
});
