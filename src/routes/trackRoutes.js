const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Track = mongoose.model("Track");

const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });
  res.json({ data: tracks });
});

router.post("/tracks", async (req, res) => {
  const { name, location } = req.body;
  if (!name || !location)
    return res
      .status(422)
      .json({ error: "You must provide name and location" });
  console.log("blank validation passed");
  try {
    console.log("inside try");
    const track = new Track({ name, location, userId: req.user._id });
    console.log("track created");
    await track.save();
    console.log("track saved");
    res.send(track);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
});
module.exports = router;
