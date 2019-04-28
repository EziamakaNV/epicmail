"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _View = _interopRequireDefault(require("../controller/View"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
const router = _express.default.Router();

router.get('/login', _View.default.login);
router.get('/signup', _View.default.signup);
router.get('/inbox', _auth.default.verifyToken, _View.default.inbox);
router.get('/sent', _auth.default.verifyToken, _View.default.sent);
router.get('/newmessage', _auth.default.verifyToken, _View.default.newmessage);
var _default = router; // Export group router

exports.default = _default;