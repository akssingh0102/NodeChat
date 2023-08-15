const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
mongoose
  .connect(process.env.MONGODB_CONN_STRING)
  .then(() => {
    console.log(`Connected to Database`);
  })
  .catch((err) => {
    console.error(`Can't connect to database`);
  });
const jwtSecret = process.env.JWT_SECRET;

const User = require("./models/User");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/test", (req, res) => {
  res.json("Test Ok!");
});

app.get("/profile", (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;

      res.json(userData);
    });
  } else {
    res.status(401).json("no token");
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const createdUser = await User.create({ username, password });

    jwt.sign(
      { userId: createdUser._id, username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token)
          .status(201)
          .json({
            status: "ok",
            data: {
              id: createdUser._id,
            },
          });
      }
    );
    // res.json();
  } catch (err) {
    if (err) throw err;
    res.status(500).json("fail");
  }
});

app.listen(4040);
