const mongoose = require("mongoose");

const login = new mongoose.Schema({
  user: { type: String, require: true },
  pw: { type: String, require: true },
});
const Login_model = mongoose.model("data", login);
module.exports = Login_model;
