const router = require("express").Router();
const bookRoutes = require("./businesses");

// Book routes
router.use("/businesses", businessRoutes);

module.exports = router;