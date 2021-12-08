require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("./middlewares/requireAuth");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoURI = `mongodb+srv://admin:${process.env.DB_PASS}@trackapp.suypx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI);
mongoose.connection.on("connected", () => {
  console.log("connected to instance");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongoose", err);
});

app.get("/", requireAuth, (req, res) => {
  res.json(req.user);
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
