const router = require("express").Router();
const businessRoutes = require("./businesses");
const mapsRoutes = require("./maps");

// Book routes
router.use("/businesses", businessRoutes);
router.use("/maps", mapsRoutes);

module.exports = router;