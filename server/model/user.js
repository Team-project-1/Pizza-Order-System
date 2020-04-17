const mongoose = require("mongoose");

//Schema to store the user details in the database
const user = mongoose.Schema({
  name: {
    type: "String",
    required: true
  },
  email: {
    type: "String",
    required: true
  },
  password: {
    type: "String",
    required: true
  }
});

module.exports = mongoose.model("User", user, 'Users');
