const router = require("express").Router();
const businessRoutes = require("./businesses");

// Book routes
router.use("/businesses", businessRoutes);

module.exports = router;