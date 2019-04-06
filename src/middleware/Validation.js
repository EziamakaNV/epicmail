import joi from 'joi';

class Validation {
  static signupValidation(signUp) {
    const schema = {
      firstName: joi.string().max(10).min(2)
        .required(),
      lastName: joi.string().max(10).min(2).required(),
      userName: joi.string().max(10).min(2).required(),
      password: joi.string().max(14).min(2).required(),
    };
    return joi.validate(signUp, schema);
  }

  static loginValidation(logIn) {
    const schema = {
      email: joi.string().email().max(40).min(2)
        .required(),
      password: joi.string().max(14).min(2).required(),
    };
    return joi.validate(logIn, schema);
  }

  static messageId(params) {
    const schema = {
      messageId: joi.number().integer().greater(0)
        .positive()
        .required(),
    };
    return joi.validate(params, schema);
  }

  static createGroup(params) {
    const schema = {
      name: joi.string().max(15).min(2).required(),
      creatorId: joi.number().integer().greater(0)
        .positive()
        .required(),
    };
    return joi.validate(params, schema);
  }

  static patchGroup(params) {
    const schema = {
      groupId: joi.number().integer().greater(0)
        .positive()
        .required(),
      name: joi.string().max(15).min(2).required(),
    };
    return joi.validate(params, schema);
  }

  static deleteGroup(params) {
    const schema = {
      groupId: joi.number().integer().greater(0)
        .positive()
        .required(),
    };
    return joi.validate(params, schema);
  }

  static addGroup(params) {
    const schema = {
      groupId: joi.number().integer().greater(0)
        .positive()
        .required(),
      newMember: joi.number().integer().greater(0)
        .positive()
        .required(),
    };
    return joi.validate(params, schema);
  }

  static deleteGroupMember(params) {
    const schema = {
      groupId: joi.number().integer().greater(0)
        .positive()
        .required(),
      userId: joi.number().integer().greater(0)
        .positive()
        .required(),
    };
    return joi.validate(params, schema);
  }
}

export default Validation;
