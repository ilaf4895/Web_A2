const express = require("express");
const jwt = require("jsonwebtoken");
const Course = require("../models/Course");
const Registration = require("../models/Registration");
require("dotenv").config();

const router = express.Router();

// Middleware for authentication
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Get all courses
router.get("/courses", authMiddleware, async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Register for a course
router.post("/register", authMiddleware, async (req, res) => {
  const { courseCode } = req.body;
  const course = await Course.findOne({ courseCode });

  if (!course || course.seatsAvailable <= 0) {
    return res.status(400).json({ message: "Course full or not found" });
  }

  await Registration.create({ studentRollNumber: req.user.rollNumber, courseCode });
  await Course.updateOne({ courseCode }, { $inc: { seatsAvailable: -1 } });

  res.json({ message: "Registered successfully" });
});

module.exports = router;
