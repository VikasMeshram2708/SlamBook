const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const volleyball = require("volleyball");

// Middlewares
app.use(express.json());
app.use(volleyball);

app.use("/api/auth", require("./Routes/auth"));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
