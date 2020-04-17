const mongoose = require("mongoose");

//Schema to store the user details in the database
const user = mongoose.Schema({
  name: {
    type: "String",
    required: true,
    max: 255,
    min: 6
  },
  email: {
    type: "String",
    required: true,
    max: 255,
    min: 6
  },
  password: {
    type: "String",
    required: true,
    max: 1024,
    min: 6
  }
});

module.exports = mongoose.model("User", user);
