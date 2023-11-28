"user strict";
const joi = require("joi");
const schema = {
  register: joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    roleType: joi.string().allow('receiver', 'payer', 'admin')
  }),
  login: joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
  }),
};

module.exports = schema;
