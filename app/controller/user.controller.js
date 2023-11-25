const { response, request } = require("express");
const User = require("../models/user.model");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secretKey = 'rahasia';

exports.register = async (request, response) => {
  try {
    const { username, email, password } = request.body;
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (existingUser) {
      return response
        .status(400)
        .json({ message: "Username or email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    response.status(201).json(user);
  } catch (err) {
    response.status(500).json({ message: err });
  }
};

exports.login = async (request, response) => {
  try {
    const { username, password } = request.body;
    const searchUser = await User.findOne({
      where: {
        username,
      },
    });

    if (searchUser) {
      const passwordMatch = await bcrypt.compare(password, searchUser.password);
      if (passwordMatch) {
        const token = jwt.sign({ username, password }, secretKey, { expiresIn: '1h' });
        return response.status(200).json({ token: token });
      } else {
        return response.status(401).json({ message: "Incorrect password" });
      }
    }
    response.status(400).json({ message: "user not found" });
  } catch (err) {
    response.status(500).json({ message: err });
  }
};
