const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("KDCC backend is running 🔥"); 
});

// CONNECT DATABASE
mongoose.connect("mongodb://127.0.0.1:27017/kdcc");

// MODELS
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

const Prayer = mongoose.model("Prayer", {
  userId: String,
  message: String,
});

// REGISTER
app.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashed });
  res.send(user);
});

// LOGIN
app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).send("Wrong password");

  const token = jwt.sign({ id: user._id }, "secret");
  res.send({ token, userId: user._id });
});

// PRAYER REQUEST
app.post("/prayer", async (req, res) => {
  const prayer = await Prayer.create(req.body);
  res.send(prayer);
});

// GET PRAYERS
app.get("/prayer/:userId", async (req, res) => {
  const prayers = await Prayer.find({ userId: req.params.userId });
  res.send(prayers);
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});

const cors = require("cors");
app.use(cors());

