import joi from 'joi';

class Validation {
  static signupValidation(signUp) {
    const schema ={firstName: joi.string().max(10).min(2).required(),}
    return joi.validate(user, schema);
  }
}

export default Validation;
