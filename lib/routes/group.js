"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Group = _interopRequireDefault(require("../controller/Group"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/', _auth.default.verifyToken, _Group.default.createGroup);
router.get('/', _auth.default.verifyToken, _Group.default.getAllGroups);
router.patch('/:groupId/:name', _auth.default.verifyToken, _Group.default.patchGroup);
router.delete('/:groupId', _auth.default.verifyToken, _Group.default.deleteGroup);
router.post('/:groupId/users', _auth.default.verifyToken, _Group.default.addUser);
router.delete('/:groupId/users/:userId', _auth.default.verifyToken, _Group.default.deleteUser);
router.post('/:groupId/messages', _auth.default.verifyToken, _Group.default.sendMessageToGroup);
var _default = router; // Export group router

exports.default = _default;