"user strict";
const commonResponse = require("../../utils/commonResponse");
const UserSchema = require("./user-schema");
const constants = require("../../utils/constants");
const { ServerStatusCode } = constants;
const { apiErrorRes } = commonResponse;

const errorMessage = (value, res, next) => {
  if (value.error) {
    console.log(value.error, "+++++++++++");
    apiErrorRes(
      res,
      value.error.details[0].message.replace(/[^a-zA-Z ]/g, ""),
      ServerStatusCode.UNPROCESSABLE,
      true
    );
  } else {
    next();
  }
};

module.exports = {
  register: async (req, res, next) => {
    const value = await UserSchema.register.validate(req.body);
    errorMessage(value, res, next);
  },
  login: async (req, res, next) => {
    const value = await UserSchema.login.validate(req.body);
    errorMessage(value, res, next);
  },
};
