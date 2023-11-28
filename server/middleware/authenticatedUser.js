const jwt = require('jsonwebtoken');
const { TOKEN_REQUIRED, INVALID_TOKEN } = require('../constants/messages');
const { jwtSecretKey } = require('../config/config');
const { User } = require("../models");

module.exports.authenticatedUser = async (req, res, next) => {
  // get authorization Header
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.json({
      message: TOKEN_REQUIRED,
    });
  }
  // Get auth token by splitting with Bearer
  const token = authorizationHeader.split('Bearer ')[1];
  const options = {
    expiresIn: '2d',
  };

  try {
    // Verify auth token with secret key and options
    const { id } = jwt.verify(token, jwtSecretKey, options);
    const user = await User.findByPk(id);
    req.user = JSON.parse(JSON.stringify(user));
    return next();
  } catch (error) {
    return res.json({
      message: INVALID_TOKEN,
    });
  }
};
