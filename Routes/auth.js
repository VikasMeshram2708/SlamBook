const express = require("express");

const router = express.Router();

const UserSchema = require("../Models/Auth");

const db = require("../DB");

const User = db.get("users");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const fetchuser = require("../Middlewares/fetchuser");

// get all the users
router.get("/showAllUsers", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(201).json({
      message: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

// Route 1: Create a User using POST : "/api/auth/createUser"
router.post("/createUser", async (req, res) => {
  try {
    // validate the user
    const user = await UserSchema.validateAsync(req.body);
    if (user) {
      // find the email if already exist
      const isExist = await User.findOne({ email: req.body.email });
      if (isExist) {
        return res.status(403).json({
          message:
            "Hey, try to register with valid credentails email already registerd...",
        });
      }
      // hash the password
      const secPass = await bcrypt.hash(req.body.password, 10);
      user.password = secPass;
      // insert to DB
      user.created_on = new Date().toLocaleString();
      const createdUser = await User.insert(user);
      return res.status(201).json({
        message: "User Registered Successfully",
        data: createdUser,
      });
    }
    return res.status(422).json({
      message: "Try to register with valid Credentials",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

// Route 2 : User login using POST : "/api/auth/userLogin"
router.post("/userLogin", async (req, res) => {
  try {
    // find the user
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      // compare the password
      const isValidKey = await bcrypt.compare(req.body.password, user.password);
      if (!isValidKey) {
        return res.status(404).json({
          message:
            "Hey, try to login with valid credentails invalid key provided",
        });
      }
      // show success response and sign jwt
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);

      return res.status(201).json({
        message: "User Registered Successfully",
        token: authToken,
      });
    }
    return res.status(422).json({
      message: "Try to login with valid Credentials Invalid Email provided...",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

// Route 3 : fetch the user
router.get("/getUser", fetchuser, async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user._id,
    });
    return res.status(201).json({
      message: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
