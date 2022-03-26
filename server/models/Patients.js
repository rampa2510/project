const mongoose = require("mongoose");

const PatientsSchema = new mongoose.Schema({
  name: String,
  hospital: String,
  username: String,
  password: String,
});

module.exports = mongoose.model("patients", PatientsSchema);
