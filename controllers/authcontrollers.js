let users=require('../models/usermodel')
let bcrypt=require('bcrypt')
let jwt=require('jsonwebtoken')
require('dotenv').config
exports.register= async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    // check missing fields
    if (!username || !password || !email || !role) {
      return res.json({
        msg: "Missing fields"
      });
    }

    // check if username exists
    let checkuser = await users.findOne({ username });

    if (checkuser) {
      return res.json({
        msg: "Username already exists"
      });
    }

    // hash password
    let hashpassword = await bcrypt.hash(password, 10);

    // create user and store in variable
    let newUser = await users.create({
      username,
      password: hashpassword,
      email,
      role
    });

    // generate token
    let token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role
      },
      process.env.secretkey,
      {
        expiresIn: "1h"
      }
    );

    // send response
    res.json({
      msg: "Registration successful",
      token:token
    });

    // send mail
    mail(email, username);

  } catch (error) {
    res.json({
      msg: error.message
     
    });
  }
}

exports.login= async (req, res, next) => {
  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({
        msg: "Missing fields"
      });
    }

    // check user
    let checkuser =
      await users.findOne({ username });

    if (!checkuser) {
      return res.json({
        msg: "User not found"
      });
    }

    // check password
    let checkpassword =
      await bcrypt.compare(
        password,
        checkuser.password
      );

    if (!checkpassword) {
      return res.status(403).json({
        msg: "Password or username mismatched"
      });
    }

    // get token from Authorization header
    let authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        msg: "Authorization token missing"
      });
    }

    let token =
      authHeader.split(" ")[1];

    // verify token
    let checktoken =
      jwt.verify(token, process.env.secretkey);

    if (!checktoken) {
      return res.json({
        msg: "Invalid token"
      });
    }

    return res.json({
      msg: "Login successful",
       token: token
    });

  } catch (error) {
    next(error);
  }
}