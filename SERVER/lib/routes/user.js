"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../controller/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/signup', _User.default.signup);
router.post('/login', _User.default.login);
var _default = router;
exports.default = _default;