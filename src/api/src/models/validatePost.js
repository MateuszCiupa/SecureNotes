import Joi from '@hapi/joi';

const namePattern = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*$/;
const contentPattern = /[A-Za-z0-9/sĄĆĘŁŃÓŚŹŻąćęłńóśźż,.:'";?()]+$/;

export default data => (
    Joi.object({
        shared: Joi.bool()
            .required(),
        content: Joi.string()
            .pattern(contentPattern)
            .max(2048)
            .required(),
        title: Joi.string()
            .pattern(namePattern)
            .min(2)
            .max(100)
            .required()
    }).validate(data)
);