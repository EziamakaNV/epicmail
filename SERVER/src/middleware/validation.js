import joi from 'joi';

 validation(user) {
    const schema = {
        firstName: joi.string().max(10).min(2).required(),
    };
    return joi.validate(user, schema);
}

export default validation;
