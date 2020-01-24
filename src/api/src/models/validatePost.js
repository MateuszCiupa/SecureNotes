import Joi from '@hapi/joi';

const contentPattern = /[A-Za-z0-9\sĄĆĘŁŃÓŚŹŻąćęłńóśźż,.:'";?()]+$/;

export default data => (
    Joi.object({
        shared: Joi.bool()
            .required(),
        content: Joi.string()
            .pattern(contentPattern)
            .max(2048)
            .required(),
        title: Joi.string()
            .pattern(/[A-Za-z0-9\s]+$/)
            .min(2)
            .max(100)
            .required()
    }).validate(data)
);