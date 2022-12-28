const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const volleyball = require("volleyball");
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(volleyball);

app.use("/api/auth", require("./Routes/auth"));
app.use("/api/slams", require("./Routes/slams"));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
