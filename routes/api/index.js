const router = require("express").Router();

const userController = require("./userRoutes");
const thoughtController = require("./thoughtRoutes");

router.use("/users", userController);
router.use("/thoughts", thoughtController);

module.exports = router;
