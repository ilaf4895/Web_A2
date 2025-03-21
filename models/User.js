const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true },
  name: String,
  role: { type: String, enum: ["student", "admin"], required: true },
  password: String, // Only for Admins
});

// Hash password before saving (for admins)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);
