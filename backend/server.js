const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
// const bodyParser = require("body-parser");
dotenv.config();
require("./auth/passport");
const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081",
// };

//middleware
app.use(cors()); //corsOptions
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
const router = require("./routes/movieRouter.js");
app.use("/api", router);

//testting api
app.get("/", (req, res) => {
  res.json({ message: "No Issue Found" });
});

//port
const PORT = process.env.PORT || 8080;

//server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
