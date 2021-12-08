const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    res.json({ token });
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).json({ error: "Must Provide Email and Password" });
  const dbUser = await User.findOne({ email });
  if (!dbUser)
    return res.status(422).json({ error: "Inavlsid Password or Email" });

  try {
    await dbUser.comparePasswords(password);
    const token = jwt.sign({ userId: dbUser._id }, process.env.JWT_SECRET_KEY);
    res.json({ token });
  } catch (error) {
    return res.status(422).json({ error: "Inavlid Password or Email" });
  }
});

module.exports = router;
