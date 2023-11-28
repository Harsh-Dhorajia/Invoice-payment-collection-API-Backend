/* eslint-disable no-shadow */
const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { generateToken } = require("../../utils/generateToken");
const {
  USER_NOT_FOUND,
  USER_LOGIN_SUCCESS,
  INVALID_USER_OR_PASSWORD,
} = require("../../constants/messages");
const { Op } = require('sequelize');
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // fetch if user exists or not
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: username }, { username }],
      },
    });

    if (!user) {
      return res.status(404).json({ message: USER_NOT_FOUND });
    }
    // check if the user has entered the password correctly
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: INVALID_USER_OR_PASSWORD });
    }
    // generate JWT auth token and save in user table
    const token = await generateToken(user);
    await User.update(
      {
        authToken: token,
      },
      {
        where: { id: user.id },
      }
    );
    return res.send({
      message: USER_LOGIN_SUCCESS,
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return res.send(error);
  }
};

module.exports = login;
