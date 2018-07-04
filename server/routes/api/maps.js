const router = require("express").Router();
const mapsController = require("../../controllers/mapsController");

// Matches with "/api/map"
// I need to refactor this so matches the format of lat + lng
router.route("/:query/:lat/:lng")
	.get(mapsController.queryMap);


module.exports = router;