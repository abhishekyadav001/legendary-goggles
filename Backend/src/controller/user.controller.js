const argon2 = require("argon2");

const userModel = require("../model/users.model");
require("dotenv").config();

// secret key
const secretKey = process.env.SECRET_KEY;

// backlist
const backlist = [];

async function userLoginController(email, password) {
  try {
    const hashpass = await argon2.hash(password);
    const user = await userModel.create({ email, password: hashpass });
    return {
      payload: {
        Success: "true",
        Message: "Valid User",
      },
    };
  } catch (error) {
    return {
      payload: {
        Success: "False",
        Message: "Invalid User",
      },
    };
  }
}

function userLogoutController(token) {
  if (!token) {
    return {
      status: 404,
      payload: { msg: "Token Not Found" },
    };
  }
  backlist.push(token);

  return {
    status: 201,
    payload: { msg: "Logout Successfull" },
  };
}

module.exports = { userLoginController, userLogoutController };
