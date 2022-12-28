const express = require("express");

const router = express.Router();

const SlamSchema = require("../Models/Slams");

const db = require("../DB");

const Slams = db.get("slams");

const fetchuser = require("../Middlewares/fetchuser");

// Route 1 : get all slams using GET : /api/slams/mySlams
router.get("/mySlams", fetchuser, async (req, res) => {
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

// Route 2 : Create slam using POST : /api/slams/createSlam
router.post("/createSlam", fetchuser, async (req, res) => {
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

// Route 3 : Update slam using PUT : /api/slams/updateSlam
router.put("/updateSlam/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const value = await SlamSchema.validateAsync(req.body);

    const item = await Slams.findOne({
      _id: id,
    });

    if (!item) {
      return res.status(422).json({
        message: "Not Found...",
      });
    }

    const updated = await Slams.update(
      {
        _id: id,
      },
      {
        $set: value,
      }
    );
    return res.status(201).json({
      message: value,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
