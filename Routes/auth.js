const express = require("express");

const router = express.Router();

const UserSchema = require("../Models/Auth");

const db = require("../DB");

const User = db.get("users");

const bcrypt = require("bcryptjs");

// Route 1: Create a User using post : "/api/auth/createUser"
router.post("/createUser", async (req, res) => {
  try {
    // validate the user
    const user = await UserSchema.validateAsync(req.body);
    if (user) {
      // find the email if already exist
      const isExist = await User.findOne({ email: req.body.email });
      if (isExist) {
        return res.status(422).json({
          message:
            "Hey, try to register with valid credentails email already registerd...",
        });
      }
      // hash the password
      const secPass = await bcrypt.hash(req.body.password, 10);
      user.password = secPass;
      // insert to DB
      const createdUser = await User.insert(user);
      return res.status(201).json({
        message: "User Registered Successfully",
        data: user,
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

module.exports = router;
