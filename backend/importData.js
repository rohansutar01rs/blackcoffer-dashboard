require("dotenv").config();

const mongoose = require("mongoose");
const fs = require("fs");

const Data = require("./models/Data");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

const jsonData = JSON.parse(
  fs.readFileSync("jsondata.json", "utf-8")
);

const importData = async () => {
  try {
    await Data.deleteMany();

    await Data.insertMany(jsonData);

    console.log("Data Imported Successfully");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

importData();