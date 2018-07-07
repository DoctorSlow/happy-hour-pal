const router = require("express").Router();
const businessRoutes = require("./businesses");
const dealsRoutes = require("./deals");
const mapsRoutes = require("./maps");

// Book routes
router.use("/businesses", businessRoutes);
router.use("/deals", dealsRoutes);
router.use("/maps", mapsRoutes);

module.exports = router;