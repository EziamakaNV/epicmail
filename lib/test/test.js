"use strict";

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/web.dom.iterable");

var _mocha = _interopRequireDefault(require("mocha"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

var _db = _interopRequireDefault(require("../model/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable max-len */

/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const expect = _chai.default.expect;

_chai.default.use(_chaiHttp.default);

describe('POST /api/v1/auth/signup', () => {
  describe('handle valid input (POST body properties)', () => {
    it('should return an object with properties "status" and "data" on sucess', done => {
      // Mocha done callback for asynchronous tests
      _chai.default.request(_server.default).post('/api/v1/auth/signup').type('form').send({
        firstName: 'John',
        lastName: 'Doe',
        userName: 'chayoyo',
        password: 'secret'
      }).end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(res).to.have.status(200); // eslint-disable-next-line no-unused-expressions

        expect(res.body).to.be.a('object');
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('data');
        expect(res.body.data).to.be.a('array');
        done();
      });
    }); // eslint-disable-next-line no-undef

    it('should return an error if the username already exists', done => {
      // Mocha done callback for asynchronous tests
      _chai.default.request(_server.default).post('/api/v1/auth/signup').type('form').send({
        firstName: 'John',
        lastName: 'Doe',
        userName: 'chayoyo',
        password: 'secret'
      }).end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(res).to.have.status(409); // eslint-disable-next-line no-unused-expressions

        expect(res.body).to.be.a('object');
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(409);
        expect(res.body).to.haveOwnProperty('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
    });
    it('should return an error if any of the provided parameters does not have a character range between 2-10', done => {
      // Mocha done callback for asynchronous tests
      _chai.default.request(_server.default).post('/api/v1/auth/signup').type('form').send({
        firstName: 'John',
        lastName: 'Doe',
        userName: 'Mekusjfjbdfjdbfjbddjbfjdfbjdbjbd',
        password: 'secret'
      }).end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(res).to.have.status(400); // eslint-disable-next-line no-unused-expressions

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
    it('should not be able to post if all the parameters are not present', done => {
      _chai.default.request(_server.default).post('/api/v1/auth/signup').type('form').send({
        firstName: 'John',
        lastName: 'Doe',
        userName: 'johnnyDoe'
      }).end((err, res) => {
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
  after(done => {
    _db.default.query(`DELETE FROM users WHERE email = $1`, ['chayoyo@epicmail.com']);

    done();
  });
});
describe('POST /api/v1/auth/login', () => {
  describe('handles valid input (POST body properties)', () => {
    it('if user has an account, it should respond with a property status of 200 and a data property with a token', done => {
      _chai.default.request(_server.default).post('/api/v1/auth/login').type('form').send({
        email: 'TDD@epicmail.com',
        password: 'secret'
      }).end((err, res) => {
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
    it('should respond with 401 status and error properties if invalid credentials are submitted', done => {
      _chai.default.request(_server.default).post('/api/v1/auth/login').type('form').send({
        email: 'example@test.com',
        password: 'nothing'
      }).end((err, res) => {
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
    it('should not be able to log in if all parameters are not present', done => {
      _chai.default.request(_server.default).post('/api/v1/auth/login').type('form').send({
        email: 'TDD@epicmail.com'
      }).end((err, res) => {
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
    it('on sucess it should return an object with properties status and data', done => {
      _chai.default.request(_server.default).get('/api/v1/messages').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
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
    it('on sucess it should return an object with properties status and data', done => {
      _chai.default.request(_server.default).get('/api/v1/messages/unread').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
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
    it('there should be no empty elements in the data array', done => {
      _chai.default.request(_server.default).get('/api/v1/messages/unread').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(res, 'response object status').to.have.status(200);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(200);
        expect(res.body, 'response body').to.haveOwnProperty('data');
        expect(res.body.data, 'data property').to.be.a('array');
        let isElementEmpty = false;
        res.body.data.forEach(element => {
          // eslint-disable-next-line eqeqeq
          if (element == false) {
            // If falsy i.e element is undefined, null, 0 etc, set isElementEmpty to true
            isElementEmpty = true;
          }
        }); // eslint-disable-next-line no-unused-expressions

        expect(isElementEmpty).to.be.false;
        done();
      });
    });
  });
});
describe('GET /api/v1/messages/sent', () => {
  describe('should fetch all sent mails', () => {
    it('on sucess it should return an object with properties status and data', done => {
      _chai.default.request(_server.default).get('/api/v1/messages/sent').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
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
    it('there should be no empty elements in the data array', done => {
      _chai.default.request(_server.default).get('/api/v1/messages/sent').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(res, 'response object status').to.have.status(200);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(200);
        expect(res.body, 'response body').to.haveOwnProperty('data');
        expect(res.body.data, 'data property').to.be.a('array');
        let isElementEmpty = false;
        res.body.data.forEach(element => {
          // eslint-disable-next-line eqeqeq
          if (element == false) {
            // If falsy i.e element is undefined, null, 0 etc, set isElementEmpty to true
            isElementEmpty = true;
          }
        }); // eslint-disable-next-line no-unused-expressions

        expect(isElementEmpty).to.be.false;
        done();
      });
    });
  });
});
describe('POST /api/v1/messages', () => {
  describe('should create or send emails to individuals', () => {
    it('when all relevant properties are sent in the POST body, on sucess it should return an object with properties status and data', done => {
      _chai.default.request(_server.default).post('/api/v1/messages').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').type('form').send({
        receiverEmail: 'Mekus@epicmail.com',
        subject: 'Test Subject',
        message: 'Eu quo urbanitas reprehendunt. Omittam commune singulis ex sit. In facilisis honestatis pri, nonumes ponderum ius no. Cu sumo reprehendunt ius'
      }).end((err, res) => {
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
describe('should handles missing properties in POST body', () => {
  it('Server should respond with a 400 bad request if any of the parameters in the POST body is missing', done => {
    _chai.default.request(_server.default).post('/api/v1/messages').type('form').send({
      senderId: 12456,
      subject: 'Test Subject',
      message: 'Eu quo urbanitas reprehendunt. Omittam commune singulis ex sit. In facilisis honestatis pri, nonumes ponderum ius no. Cu sumo reprehendunt ius'
    }).end((err, res) => {
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
describe('GET /api/v1/messages/<messages-id>', () => {
  it('the endpoint should respond with a 400 bad request if the messages-id parameter is not an integer', done => {
    _chai.default.request(_server.default).get('/api/v1/messages/abcd').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
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
  it('the endpoint should respond with a 200 OK if the messages-id parameter is an integer and held in record', done => {
    _chai.default.request(_server.default).get('/api/v1/messages/1').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
      // eslint-disable-next-line no-unused-expressions
      expect(err).to.be.null;
      expect(res, 'response status').to.have.status(200);
      expect(res.body, 'response body').to.be.a('object');
      expect(res.body, 'response body').to.haveOwnProperty('status');
      expect(res.body.status, 'status property').to.equal(200);
      expect(res.body, 'response body').to.haveOwnProperty('data');
      expect(res.body.data, 'data property').to.be.a('array');
      done();
    });
  });
  it('the endpoint should respond with a 404 NotFound if the messages-id parameter is an integer but not held in record', done => {
    _chai.default.request(_server.default).get('/api/v1/messages/9999').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
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
});
describe('DELETE /api/v1/messages/<messages-id>', () => {
  it('the endpoint should respond with a 400 bad request if the messages-id parameter is not an integer', done => {
    _chai.default.request(_server.default).delete('/api/v1/messages/abcd').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
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
  it('the endpoint should respond with a 200 OK if the messages-id parameter is an integer and held in record', done => {
    _chai.default.request(_server.default).delete('/api/v1/messages/1').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
      // eslint-disable-next-line no-unused-expressions
      expect(err).to.be.null;
      expect(res, 'response status').to.have.status(200);
      expect(res.body, 'response body').to.be.a('object');
      expect(res.body, 'response body').to.haveOwnProperty('status');
      expect(res.body.status, 'status property').to.equal(200);
      expect(res.body, 'response body').to.haveOwnProperty('data');
      expect(res.body.data, 'data property').to.be.a('array');
      done();
    });
  });
  after(done => {
    // Add data back after deleting
    const query1 = `INSERT INTO messages(id, createdon, subject, message, status)
    VALUES($1, $2, $3, $4, $5 )`;
    const query2 = `INSERT INTO sents(senderid, messageid, createdon)
    VALUES($1, $2, $3)`;
    const query3 = `INSERT INTO inboxes (receiverid, messageid, createdon, status) 
    VALUES($1,$2,$3,$4) RETURNING *;`;
    const value1 = [1, '2019-03-19 14:05:19 +0000', 'reinsert', 'reinsertmessage', 'sent'];
    const value2 = [1, 1, '2019-03-19 14:05:19 +0000'];
    const value3 = [1, 1, 'Wed Mar 20 2019', 'read'];

    _db.default.query(query1, value1).then(() => {
      _db.default.query(query2, value2).then(() => {
        _db.default.query(query3, value3);
      });
    });

    done();
  });
  it('the endpoint should respond with a 400 if the messages-id parameter is an integer but not held in record', done => {
    _chai.default.request(_server.default).delete('/api/v1/messages/9999').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
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
});
describe('POST /api/v1/groups', () => {
  describe('should create a new group', () => {
    it('when all relevant properties are sent in the POST body, on sucess it should return an object with properties status and data', done => {
      _chai.default.request(_server.default).post('/api/v1/groups').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').type('form').send({
        name: `Testingchai${Math.floor(Math.random() * 4000)}`
      }).end((err, res) => {
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
    it('Server should respond with a 400 bad request token in the header is missing', done => {
      _chai.default.request(_server.default).post('/api/v1/groups').type('form').send({
        name: Math.random().toString(36).substring(7)
      }).end((err, res) => {
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
describe('GET /api/v1/groups', () => {
  describe('should get all groups', () => {
    it('should return all groups', done => {
      _chai.default.request(_server.default).get('/api/v1/groups').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
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
    it('Server should respond with a 400 bad request if the token is missing', done => {
      _chai.default.request(_server.default).get('/api/v1/groups').end((err, res) => {
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
describe('PATCH /api/v1/groups/:groupId/:name', () => {
  describe('should change the name of a group', () => {
    it('name should change', done => {
      _chai.default.request(_server.default).patch('/api/v1/groups/1/chaipatchtest').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
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
describe('DELETE /api/v1/groups/:groupId', () => {
  describe('should delete group', () => {
    let id;
    before(done => {
      // Populate db before deleting
      const text = `INSERT INTO
    groups(name, creatorId)
    VALUES($1, $2)
    returning id`;
      const values = ['mochaTestGroup', 1];

      _db.default.query(text, values).then(result => {
        const rows = result.rows; // eslint-disable-next-line prefer-destructuring

        id = rows[0].id;
        done();
      }).catch(() => {
        done();
      });
    });
    it('should delete group owned by user', done => {
      _chai.default.request(_server.default).delete(`/api/v1/groups/${id}`).set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
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
describe('POST /api/v1/groups/:groupId/user', () => {
  describe('should add a user to a group', () => {
    it('adds a user to a group', done => {
      _chai.default.request(_server.default).post('/api/v1/groups/7/users').type('form').send({
        user: 2
      }).set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
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
describe('DELETE /api/v1/groups/:groupId/users/:userId', () => {
  describe('should delete a user from a group', () => {
    before(done => {
      // Populate db before deleting
      const text = `INSERT INTO groupMembers(groupId, memberId, role)
      VALUES($1, $2, $3) RETURNING id`;
      const values = [7, 2, 'member'];

      _db.default.query(text, values).then(() => {
        done();
      }).catch(() => {
        done();
      });
    });
    it('should delete a user from a group owned by user', done => {
      _chai.default.request(_server.default).delete('/api/v1/groups/7/users/2').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').end((err, res) => {
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
describe('POST /api/v1/groups/:groupId/messages', () => {
  describe('send a message to a group', () => {
    it('should send a message to a group', done => {
      _chai.default.request(_server.default).post('/api/v1/groups/7/messages').type('form').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUzODcxOTg1LCJleHAiOjE1ODU0MDc5ODV9.kxiPZIp8pU9_MlvdvPaosR7GYwtjh865tP7myxsuvnw').send({
        subject: `${Math.floor(Math.random(300))} test send message`,
        message: `${Math.floor(Math.random(300))} 4th lorem ipsum test message`
      }).end((err, res) => {
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