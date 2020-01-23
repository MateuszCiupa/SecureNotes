import Joi from '@hapi/joi';

const namePattern = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*$/;

const usernameSchemaObj = {
    login: Joi.string()
        .pattern(/[A-Za-z0-9]+$/)
        .min(4)
        .max(20)
        .required()
};

const loginSchemaObj = {
    password: Joi.string()
        .min(8)
        .max(1024)
        .required(),
    ...usernameSchemaObj
};

const registerSchebaObj = {
    ...loginSchemaObj,
    firstname: Joi.string()
        .pattern(namePattern)
        .min(2)
        .max(100)
        .required(),
    lastname: Joi.string()
        .pattern(namePattern)
        .min(2)
        .max(100)
        .required()
};

export const loginValidation = data => Joi.object(loginSchemaObj).validate(data);

export const usernameValidation = data => Joi.object(usernameSchemaObj).validate(data);

export const registerValidation = data => Joi.object(registerSchebaObj).validate(data);