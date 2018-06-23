const router = require("express").Router();
const mapsController = require("../../controllers/mapsController");

// Matches with "/api/map"
router.route("/:query")
	.get(mapsController.queryMap);


module.exports = router;