"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Mail = _interopRequireDefault(require("../controller/Mail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/', _Mail.default.getMessages);
router.get('/unread', _Mail.default.getUnread);
router.get('/sent', _Mail.default.getSent);
router.post('/', _Mail.default.postMessages);
router.route('/:messageId').get(_Mail.default.getMessageId).delete(_Mail.default.deleteMessageId);
var _default = router;
exports.default = _default;