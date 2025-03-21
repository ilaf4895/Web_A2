const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  studentRollNumber: { type: String, required: true },
  courseCode: { type: String, required: true },
});

module.exports = mongoose.model("Registration", RegistrationSchema);
