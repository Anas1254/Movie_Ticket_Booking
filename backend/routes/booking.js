const booking = require("../controllers/bookingController");
const router = require("express").Router();
const passport = require("passport");

//verifcation of login now onwards
router.use(passport.authenticate("jwt", { session: false }));
router.post("/", booking.addbooking);

router.get("/mybookings", booking.mybookings);

router.get("/", booking.allBooking);

module.exports = router;
