/* eslint-disable no-shadow */
const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const {
  USER_REGISTER_SUCCESS,
  USER_ALREADY_EXISTS,
  SERVER_ERROR,
} = require("../../constants/messages");
const { Op } = require("sequelize");

const register = async (req, res) => {
  try {
    const { username, email, roleType } = req.body;
    let { password } = req.body;

    if (!['admin', 'receiver', 'payer'].includes(roleType)) {
      return res.status(400).json({ message: 'Invalid ROle type' });
    }
    // check if email or username already exists or not
    const userAlreadyExist = await User.findOne({
      where: {
        [Op.or]: [
          { email: email },
          { username },
        ],
      },
    });

    if (userAlreadyExist) {
      return res.status(400).json({ message: USER_ALREADY_EXISTS });
    }
    // encrypt the password and save user in user table
    password = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      password,
      roleType,
    });
    if (!user) {
      return res.send({
        message: SERVER_ERROR,
      });
    }
    return res.send({
      message: USER_REGISTER_SUCCESS,
      data: {
        user,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return res.send(error);
  }
};
module.exports = register;
