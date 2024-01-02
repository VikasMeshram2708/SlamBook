import express from "express";
import { createNewSlam } from "../controllers/createSlams";
import { getAllSlams } from "../controllers/getAllSlams";

const router = express.Router();

// POST
router.route("/create-slam").post(createNewSlam);

// GET
router.route("/get-all-slams").get(getAllSlams);

export default router;
