const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

app.get("/", (req, res) => {
  res.send("Welcome!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
