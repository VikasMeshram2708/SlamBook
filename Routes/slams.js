const express = require("express");

const router = express.Router();

const SlamSchema = require("../Models/Slams");

const db = require("../DB");

const Slams = db.get("slams");

const fetchuser = require("../Middlewares/fetchuser");

// Route : Fetch the user and send its items
router.get("/getMe", fetchuser, async (req, res) => {
  try {
    const items = await Slams.find();
    console.log(items);
    return res.status(201).json({
      message: items,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

// Route 1 : get all slams using GET : /api/slams/mySlams
router.get("/mySlams", fetchuser, async (req, res) => {
  try {
    const items = await Slams.find({
      user: req.user._id,
    });
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
    const user = req.user._id;
    // console.log(user);
    const { title, description, tag } = req.body;
    // validate the body
    const slam = await SlamSchema.validateAsync(req.body);
    if (slam) {
      // insert to db
      const created_on = new Date().toLocaleString();
      const createdSlams = await Slams.insert({
        user,
        title,
        description,
        tag,
        created_on,
      });
      return res.status(201).json({
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
router.put("/updateSlam/:id", fetchuser, async (req, res) => {
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

// Route 4 : Delete slam using DELETE : /api/slams/deleteSlam
router.delete("/deleteSlam/:id", fetchuser, async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Slams.findOne({
      _id: id,
    });

    if (!item) {
      return res.status(422).json({
        message: "Not Found....",
      });
    }

    await Slams.remove({
      _id: id,
    });
    return res.status(201).json({
      message: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
