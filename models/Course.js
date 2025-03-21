const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  department: String,
  level: String,
  schedule: {
    day: String,
    time: String,
  },
  seatsAvailable: Number,
  prerequisites: [{ type: String }],
});

module.exports = mongoose.model("Course", CourseSchema);
