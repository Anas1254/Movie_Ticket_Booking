const router = require("express").Router();
const auth = require("./auth");
const movie = require("./movie");
const onGoing = require("./onGoing");
const booking = require("./booking");

// movies table
router.use("/movie", movie);

//OnGoing table
router.use("/currMovie", onGoing);

// User table
router.use("/", auth);

//booking model
router.use("/booking", booking);

module.exports = router;
