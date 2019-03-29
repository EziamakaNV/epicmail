"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Mail = _interopRequireDefault(require("../controller/Mail"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/', _auth.default.verifyToken, _Mail.default.getMessages);
router.get('/unread', _auth.default.verifyToken, _Mail.default.getUnread);
router.get('/sent', _auth.default.verifyToken, _Mail.default.getSent);
router.post('/', _auth.default.verifyToken, _Mail.default.postMessages);
router.route('/:messageId').get(_auth.default.verifyToken, _Mail.default.getMessageId).delete(_auth.default.verifyToken, _Mail.default.deleteMessageId);
var _default = router;
exports.default = _default;