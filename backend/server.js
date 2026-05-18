const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

const data = require("./jsondata.json");

app.get("/api/data", (req, res) => {
  res.json(data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});