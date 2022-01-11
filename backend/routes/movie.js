const movieController = require("../controllers/movieController");
const router = require("express").Router();
const passport = require("passport");

// No login Required
router.get("/", movieController.allMovies);
router.get("/movie/:id", movieController.singleMovie); // for single movie fetch

// login required onwards
router.use(passport.authenticate("jwt", { session: false }));

router.put("/:id", movieController.updateMovie);
router.post("/", movieController.addMovie);
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
