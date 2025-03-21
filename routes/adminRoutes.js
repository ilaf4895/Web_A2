const express = require("express");
const Course = require("../models/Course");
const router = express.Router();

// Add Course
router.post("/add-course", async (req, res) => {
  await Course.create(req.body);
  res.json({ message: "Course added" });
});

// Remove Course
router.post("/remove-course", async (req, res) => {
  await Course.deleteOne({ courseCode: req.body.courseCode });
  res.json({ message: "Course removed" });
});

module.exports = router;
