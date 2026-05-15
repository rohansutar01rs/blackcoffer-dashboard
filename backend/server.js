require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Data = require("./models/Data");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.get("/api/data", async (req, res) => {
  try {
    const data = await Data.find();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server Started");
});