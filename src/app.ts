import express from "express";

import dotenv from "dotenv";
dotenv.config();

const app = express();

import cookieParser from "cookie-parser";
import morgan = require("morgan");

// regular middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// routes

import userRoute from "../routes/userRoute";
import slamsRoute from "../routes/slamsRoute";

app.use("/api", userRoute);
app.use("/api/slams", slamsRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Hello, from server",
  });
});

export default app;
