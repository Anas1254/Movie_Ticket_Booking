const cuurentMovies = require("../controllers/onGoingMovieController");
const router = require("express").Router();
const passport = require("passport");

router.get("/:id", cuurentMovies.singleOnGoing);

router.get("/currrent/list", cuurentMovies.allSchedule);

// login required onwards
router.use(passport.authenticate("jwt", { session: false }));

router.post("/", cuurentMovies.addOnGoing);

router.put("/:id", cuurentMovies.updateOnGoing);

router.delete("/:id", cuurentMovies.deleteOnGoing);

module.exports = router;
