const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  time: Date,
  status: { type: String, default: "Pending" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "doctors" },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "patients" },
});

module.exports = mongoose.model("appointment", AppointmentSchema);
