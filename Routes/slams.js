const express = require("express");

const router = express.Router();

const SlamSchema = require("../Models/Slams");

const db = require("../DB");

const Slams = db.get("slams");

router.get("/mySlam", async (req, res) => {
  try {
    const items = await Slams.find();
    return res.json({
      message: items,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

router.post("/createSlam", async (req, res) => {
  try {
    // validate the body
    const slam = await SlamSchema.validateAsync(req.body);
    if (slam) {
      // insert to db
      slam.created_on = new Date().toLocaleString();
      const createdSlams = await Slams.insert(slam);
      return res.json({
        data: createdSlams,
      });
    }
    return res.status(422).json({
      message: "Try, to create Slams with valid credentials",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
