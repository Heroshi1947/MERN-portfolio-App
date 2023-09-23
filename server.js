const express = require("express");
const dotenv = require("dotenv");
const emailRoutes = require("./routes/pfRoutes");

// access build folder in client
const path = require("path");

const app = express();
dotenv.config();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//static files access
app.use(express.static(path.join(__dirname, "./client/build")));

app.use(cors()); // Use this after the variable declaration

app.use(express.json()); // tell the server to accept the json data from frontend

//Signup and login
app.use("/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at http://${HOSTNAME}:${PORT}/`);
});
