const router = require("express").Router();
const dealsController = require("../../controllers/dealsController");

// Matches with "/api/deals"
router.route("/")
  .get(dealsController.findAllDeals);

// Matches with "/api/deals/:id"
router.route("/:id")
  .get(dealsController.findDealById)
  .put(dealsController.updateDeal)
//   .post(dealsController.createDeal);

module.exports = router;