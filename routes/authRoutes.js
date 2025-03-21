const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// Student & Admin Login
router.post("/login", async (req, res) => {
  const { rollNumber, password } = req.body;
  const user = await User.findOne({ rollNumber });

  if (!user) return res.status(400).json({ message: "User not found" });

  if (user.role === "admin") {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ rollNumber: user.rollNumber, role: user.role }, process.env.SECRET_KEY);
  res.json({ token, role: user.role });
});

module.exports = router;
