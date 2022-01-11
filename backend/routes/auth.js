const router = require("express").Router();
const user = require("../controllers/userController");
//user model
router.post("/register", user.userRegister);

// router.use(passport.authenticate("jwt", { session: false }))
router.post("/login", user.userLogin);

module.exports = router;
