"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Validation {
  static signupValidation(signUp) {
    const schema = {
      firstName: _joi.default.string().max(10).min(2).required(),
      lastName: _joi.default.string().max(10).min(2).required(),
      userName: _joi.default.string().max(10).min(2).required(),
      password: _joi.default.string().max(14).min(2).required()
    };
    return _joi.default.validate(signUp, schema);
  }

  static loginValidation(logIn) {
    const schema = {
      email: _joi.default.string().email().max(40).min(2).required(),
      password: _joi.default.string().max(14).min(2).required()
    };
    return _joi.default.validate(logIn, schema);
  }

  static messageId(params) {
    const schema = {
      messageId: _joi.default.number().integer().greater(0).positive().required()
    };
    return _joi.default.validate(params, schema);
  }

  static createGroup(params) {
    const schema = {
      name: _joi.default.string().max(15).min(2).required(),
      creatorId: _joi.default.number().integer().greater(0).positive().required()
    };
    return _joi.default.validate(params, schema);
  }

  static patchGroup(params) {
    const schema = {
      groupId: _joi.default.number().integer().greater(0).positive().required(),
      name: _joi.default.string().max(15).min(2).required()
    };
    return _joi.default.validate(params, schema);
  }

  static deleteGroup(params) {
    const schema = {
      groupId: _joi.default.number().integer().greater(0).positive().required()
    };
    return _joi.default.validate(params, schema);
  }

  static addGroup(params) {
    const schema = {
      groupId: _joi.default.number().integer().greater(0).positive().required(),
      newMember: _joi.default.number().integer().greater(0).positive().required()
    };
    return _joi.default.validate(params, schema);
  }

  static deleteGroupMember(params) {
    const schema = {
      groupId: _joi.default.number().integer().greater(0).positive().required(),
      userId: _joi.default.number().integer().greater(0).positive().required()
    };
    return _joi.default.validate(params, schema);
  }

}

var _default = Validation;
exports.default = _default;