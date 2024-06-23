require('dotenv').config()
const mongoose = require("mongoose");
const url = process.env.DB_CONNECTION_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("mongodb connected");
});
db.on("error", (err) => {
  console.log("mongodb connection Error: ", err);
});
db.on("disconnected", () => {
  console.log("mongodb disconnected");
});
module.exports = db;
