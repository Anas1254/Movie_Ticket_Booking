const jwt = require("jsonwebtoken");
const messages = require("../constants/messages");
const { successResponse, errorResponse } = require("../helper/response");
const db = require("../models");
// userModel insted of db taken
//create main model
const User = db.user;

//user Register
const userRegister = async (req, res) => {
  const { fullname, email, password } = req.body;

  const alearyExistUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );
  if (alearyExistUser) {
    return errorResponse(res, messages.emailExist, 401);
  }

  const newUser = new User({ fullname, email, password });
  const saveduser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(404).json({ err: "canot resigeter user at the movement." });
  });
  if (saveduser) {
    return successResponse(res, messages.signupSuccess, 200);
  }
};

//User Login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const userwithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );
  if (!userwithEmail) {
    return errorResponse(res, messages.loginFail, 401);
  }
  if (userwithEmail.password != password) {
    return errorResponse(res, messages.loginFail, 401);
  }
  const name = userwithEmail.fullname;
  const role = userwithEmail.role;
  const jwtToken = jwt.sign(
    {
      id: userwithEmail.id,
      email: userwithEmail.email,
    },
    process.env.JWT_ENC
  );
  let data = {
    user: {
      name: name,
      email: email,
    },
    token: jwtToken,
  };
  return successResponse(res, messages.loginSuccess, 200, data);
};

module.exports = { userRegister, userLogin };
