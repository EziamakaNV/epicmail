"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _mail = _interopRequireDefault(require("./routes/mail"));

var _user = _interopRequireDefault(require("./routes/user"));

var _group = _interopRequireDefault(require("./routes/group"));

var _auth = _interopRequireDefault(require("./middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable no-console */
// Importing routes
const app = (0, _express.default)();

const swaggerDocument = require('./swagger.json');

app.use((0, _cookieParser.default)());
app.use(_express.default.static('UI'));
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.get('/login', (req, res) => {
  res.sendFile('C:/Users/IGNATIUS/Desktop/epicmail/UI/Signin.html');
});
app.get('/inbox', _auth.default.verifyToken, (req, res) => {
  res.sendFile('C:/Users/IGNATIUS/Desktop/epicmail/UI/Inbox.html');
});
app.get('/signup', (req, res) => {
  res.sendFile('C:/Users/IGNATIUS/Desktop/epicmail/UI/Signup.html');
});
app.get('/sent', (req, res) => {
  res.sendFile('C:/Users/IGNATIUS/Desktop/epicmail/UI/Sent.html');
});
app.use('/api/v1/auth', _user.default);
app.use('/api/v1/messages', _mail.default);
app.use('/api/v1/groups', _group.default); // Swagger API doc

app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDocument)); // Executes when request path does not match any of the handlers

app.use((req, res) => {
  res.status(401).json({
    error: 'Bad request! Endpoint does not exist!',
    success: false
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(8080, () => {
    console.log('App listening on port 8080');
  });
} // Export app for tests


var _default = app;
exports.default = _default;