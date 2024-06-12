const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Portfolio").then(() => {
  console.log("mongodb connected");
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const User = mongoose.model("user", userSchema);

module.exports = User;
