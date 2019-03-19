/* eslint-disable no-undef */
import chai from 'chai';

import chaiHttp from 'chai-http';

import server from '../server';

const { expect } = chai;

chai.use(chaiHttp);

// eslint-disable-next-line no-undef
describe('POST /api/v1/auth/signup', () => {
  // eslint-disable-next-line no-undef
  describe('handle valid input (POST body properties)', () => {
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

    // eslint-disable-next-line no-undef
    it('should return an error if the username already exists', (done) => { // Mocha done callback for asynchronous tests
      chai.request(server)
        .post('/api/v1/auth/signup')
        .type('form')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          userName: 'Mekus',
          password: 'secret',
        })
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res).to.have.status(409);
          // eslint-disable-next-line no-unused-expressions
          expect(res.body).to.be.a('object');
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body.status).to.equal(409);
          expect(res.body).to.haveOwnProperty('error');
          expect(res.body.error).to.be.a('string');
          done();
        });
    });

    it('should return an error if any of the provided parameters does not have a character range between 2-10', (done) => { // Mocha done callback for asynchronous tests
      chai.request(server)
        .post('/api/v1/auth/signup')
        .type('form')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          userName: 'Mekusjfjbdfjdbfjbddjbfjdfbjdbjbd',
          password: 'secret',
        })
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          // eslint-disable-next-line no-unused-expressions
          expect(res.body).to.be.a('object');
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('error');
          expect(res.body.error).to.be.a('string');
          done();
        });
    });
  });

  describe('handles invalid input (POST body properties)', () => {
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

describe('POST /api/v1/auth/login', () => {
  describe('handles valid input (POST body properties)', () => {
    it('if user has an account, it should respond with a property status of 200 and a data property with a token', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: 'example@epicmail.com',
          password: 'notell',
        })
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(200);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(200);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('object');
          expect(res.body.data, 'data object').to.haveOwnProperty('token');
          done();
        });
    });

    it('should respond with 401 status and error properties if invalid credentials are submitted', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: 'example@test.com',
          password: 'nothing',
        })
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(401);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(401);
          expect(res.body, 'response body').to.haveOwnProperty('error');
          expect(res.body.error, 'error property').to.be.a('string');
          done();
        });
    });
  });

  describe('handles invalid input ((POST body properties))', () => {
    it('should not be able to log in if all parameters are not present', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: 'example@test.com',
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

describe('GET /api/v1/messages', () => {
  describe('should fetch all received mails', () => {
    it('on sucess it should return an object with properties status and data', (done) => {
      chai.request(server)
        .get('/api/v1/messages')
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(200);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(200);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('array');
          done();
        });
    });
  });
});

describe('GET /api/v1/messages/unread', () => {
  describe('should fetch all unread mails', () => {
    it('on sucess it should return an object with properties status and data', (done) => {
      chai.request(server)
        .get('/api/v1/messages/unread')
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(200);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(200);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('array');
          done();
        });
    });
    it('there should be no empty elements in the data array', (done) => {
      chai.request(server)
        .get('/api/v1/messages/unread')
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(200);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(200);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('array');
          let isElementEmpty = false;
          res.body.data.forEach((element) => {
            // eslint-disable-next-line eqeqeq
            if (element == false) {
              // If falsy i.e element is undefined, null, 0 etc, set isElementEmpty to true
              isElementEmpty = true;
            }
          });
          // eslint-disable-next-line no-unused-expressions
          expect(isElementEmpty).to.be.false;
          done();
        });
    });
  });
});

describe('GET /api/v1/messages/sent', () => {
  describe('should fetch all sent mails', () => {
    it('on sucess it should return an object with properties status and data', (done) => {
      chai.request(server)
        .get('/api/v1/messages/sent')
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(200);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(200);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('array');
          done();
        });
    });
    it('there should be no empty elements in the data array', (done) => {
      chai.request(server)
        .get('/api/v1/messages/sent')
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(200);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(200);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('array');
          let isElementEmpty = false;
          res.body.data.forEach((element) => {
            // eslint-disable-next-line eqeqeq
            if (element == false) {
              // If falsy i.e element is undefined, null, 0 etc, set isElementEmpty to true
              isElementEmpty = true;
            }
          });
          // eslint-disable-next-line no-unused-expressions
          expect(isElementEmpty).to.be.false;
          done();
        });
    });
  });
});

describe('POST /api/v1/messages', () => {
  describe('should create or send emails to individuals', () => {
    it('when all relevant properties are sent in the POST body, on sucess it should return an object with properties status and data', (done) => {
      chai.request(server)
        .post('/api/v1/messages')
        .type('form')
        .send({
          senderId: 12456,
          receiverId: 23456,
          subject: 'Test Subject',
          message: 'Eu quo urbanitas reprehendunt. Omittam commune singulis ex sit. In facilisis honestatis pri, nonumes ponderum ius no. Cu sumo reprehendunt ius',
        })
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(200);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(200);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('object');
          done();
        });
    });
  });

  describe('should handles missing properties in POST body', () => {
    it('Server should respond with a 400 bad request if any of the parameters in the POST body is missing', (done) => {
      chai.request(server)
        .post('/api/v1/messages')
        .type('form')
        .send({
          senderId: 12456,
          subject: 'Test Subject',
          message: 'Eu quo urbanitas reprehendunt. Omittam commune singulis ex sit. In facilisis honestatis pri, nonumes ponderum ius no. Cu sumo reprehendunt ius',
        })
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(400);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(400);
          expect(res.body, 'response body').to.haveOwnProperty('error');
          expect(res.body.error, 'error property').to.be.a('string');
          done();
        });
    });
  });
});

describe('GET /api/v1/messages/<messages-id>', () => {
  it('the endpoint should respond with a 400 bad request if the messages-id parameter is not an integer', (done) => {
    chai.request(server)
      .get('/api/v1/messages/abcd')
      .end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(res, 'response status').to.have.status(400);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(400);
        expect(res.body, 'response body').to.haveOwnProperty('error');
        expect(res.body.error, 'error property').to.be.a('string');
        done();
      });
  });

  it('the endpoint should respond with a 200 OK if the messages-id parameter is an integer and held in record', (done) => {
    chai.request(server)
      .get('/api/v1/messages/1')
      .end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(res, 'response status').to.have.status(200);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(200);
        expect(res.body, 'response body').to.haveOwnProperty('data');
        expect(res.body.data, 'data property').to.be.a('object');
        done();
      });
  });

  it('the endpoint should respond with a 404 NotFound if the messages-id parameter is an integer but not held in record', (done) => {
    chai.request(server)
      .get('/api/v1/messages/9999')
      .end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(res, 'response status').to.have.status(404);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(404);
        expect(res.body, 'response body').to.haveOwnProperty('error');
        expect(res.body.error, 'error property').to.be.a('string');
        done();
      });
  });
});

describe('DELETE /api/v1/messages/<messages-id>', () => {
  it('the endpoint should respond with a 400 bad request if the messages-id parameter is not an integer', (done) => {
    chai.request(server)
      .delete('/api/v1/messages/abcd')
      .end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(res, 'response status').to.have.status(400);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(400);
        expect(res.body, 'response body').to.haveOwnProperty('error');
        expect(res.body.error, 'error property').to.be.a('string');
        done();
      });
  });

  it('the endpoint should respond with a 200 OK if the messages-id parameter is an integer and held in record', (done) => {
    chai.request(server)
      .delete('/api/v1/messages/1')
      .end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(res, 'response status').to.have.status(200);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(200);
        expect(res.body, 'response body').to.haveOwnProperty('data');
        expect(res.body.data, 'data property').to.be.a('object');
        expect(res.body.data, 'data property').to.haveOwnProperty('message');
        expect(res.body.data.message, 'message property').to.be.a('string');
        done();
      });
  });

  it('the endpoint should respond with a 404 NotFound if the messages-id parameter is an integer but not held in record', (done) => {
    chai.request(server)
      .delete('/api/v1/messages/9999')
      .end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(res, 'response status').to.have.status(404);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(404);
        expect(res.body, 'response body').to.haveOwnProperty('error');
        expect(res.body.error, 'error property').to.be.a('string');
        done();
      });
  });
});

// API V2 TESTS
describe('POST /api/v2/groups', () => {
  describe('should create a new group', () => {
    it('when all relevant properties are sent in the POST body, on sucess it should return an object with properties status and data', (done) => {
      chai.request(server)
        .post('/api/v2/groups')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1Mjc3Mjc1NiwiZXhwIjoxNTU0NTcyNzU2fQ.81A8zZezFPu43iMvzNOX948y-6tRAoGdzc4FNOnBRZY')
        .type('form')
        .send({
          name: 'testingchai',
        })
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(201);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(201);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('array');
          done();
        });
    });
  });

  describe('should handle missing properties in POST body', () => {
    it('Server should respond with a 400 bad request token in the header is missing', (done) => {
      chai.request(server)
        .post('/api/v2/groups')
        .type('form')
        .send({
          name: Math.random().toString(36).substring(7),
        })
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(400);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(400);
          expect(res.body, 'response body').to.haveOwnProperty('error');
          expect(res.body.error, 'error property').to.be.a('string');
          done();
        });
    });
  });
});

describe('GET /api/v2/groups', () => {
  describe('should get all groups', () => {
    it('should return all groups', (done) => {
      chai.request(server)
        .get('/api/v2/groups')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1Mjc3Mjc1NiwiZXhwIjoxNTU0NTcyNzU2fQ.81A8zZezFPu43iMvzNOX948y-6tRAoGdzc4FNOnBRZY')
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(200);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(200);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('array');
          done();
        });
    });
  });

  describe('should handle missing token in header', () => {
    it('Server should respond with a 400 bad request if the token is missing', (done) => {
      chai.request(server)
        .get('/api/v2/groups')
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(400);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(400);
          expect(res.body, 'response body').to.haveOwnProperty('error');
          expect(res.body.error, 'error property').to.be.a('string');
          done();
        });
    });
  });
});

describe('PATCH /api/v2/groups/:groupId/:name', () => {
  describe('should change the name of a group', () => {
    it('name should change', (done) => {
      chai.request(server)
        .patch('/api/v2/groups/1/chaipatchtest')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1Mjc3Mjc1NiwiZXhwIjoxNTU0NTcyNzU2fQ.81A8zZezFPu43iMvzNOX948y-6tRAoGdzc4FNOnBRZY')
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(200);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(200);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('array');
          done();
        });
    });
  });
});

describe('DELETE /api/v2/groups/:groupId', () => {
  describe('should delete group', () => {
    it('should delete group owned by user', (done) => {
      chai.request(server)
        .delete('/api/v2/groups/12')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1Mjc3Mjc1NiwiZXhwIjoxNTU0NTcyNzU2fQ.81A8zZezFPu43iMvzNOX948y-6tRAoGdzc4FNOnBRZY')
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(200);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(200);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('array');
          done();
        });
    });
  });
});

describe('POST /api/v2/groups/:groupId/user', () => {
  describe('should add a user to a group', () => {
    it('adds a user to a group', (done) => {
      chai.request(server)
        .post('/api/v2/groups/7/users')
        .type('form')
        .send({
          user: 2,
        })
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1Mjc3Mjc1NiwiZXhwIjoxNTU0NTcyNzU2fQ.81A8zZezFPu43iMvzNOX948y-6tRAoGdzc4FNOnBRZY')
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(201);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(201);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('array');
          done();
        });
    });
  });
});

describe('DELETE /api/v2/groups/:groupId/users/:userId', () => {
  describe('should delete a user from a group', () => {
    it('should delete a user from a group owned by user', (done) => {
      chai.request(server)
        .delete('/api/v2/groups/7/users/4')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1Mjc3Mjc1NiwiZXhwIjoxNTU0NTcyNzU2fQ.81A8zZezFPu43iMvzNOX948y-6tRAoGdzc4FNOnBRZY')
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(200);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(200);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('array');
          done();
        });
    });
  });
});
});
