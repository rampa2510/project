const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbCon");
const Patients = require("./models/Patients");
const Appointment = require("./models/Appointment");
const Doctor = require("./models/Doctor");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  let data = await Patients.findOne({ username, password });
  if (!data) {
    data = await Doctor.findOne({ username, password });
    return res.send({ data, type: "doc" });
  }
  res.send({ data });
});

app.post("/register", async (req, res) => {
  console.log("body", req.body);
  await Appointment.create({ ...req.body });
  res.send({ msg: "ok" });
});

app.get("/get", async (req, res) => {
  const data = await Appointment.find({ status: "Pending" });
  res.send({ data });
});

app.post("/accept", async (req, res) => {
  console.log("body", req.body);
  const { id, doctor, time } = req.body;
  await Appointment.findByIdAndUpdate(id, {
    $set: { time, doctor, status: "Accepted" },
  });
  res.send({ msg: "ok" });
});

app.get("/status/:id", async (req, res) => {
  console.log("body", req.body);
  const { id } = req.params;
  const data = await Appointment.find({
    $or: [{ patient: id }, { doctor: id }],
  }).populate("doctor");
  res.send({ msg: data });
});

app.listen(9000, async () => {
  await dbConnect();
});
