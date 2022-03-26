const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
});

module.exports = mongoose.model("doctors", DoctorSchema);
