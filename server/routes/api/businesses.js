const router = require("express").Router();
const businessesController = require("../../controllers/businessesController");

// Matches with "/api/businesses"
router.route("/")
  .get(businessesController.findAll)
  .post(businessesController.create);

// Matches with "/api/businesses/:id"
router.route("/:id")
  .get(businessesController.findById)
  .put(businessesController.update)
  .delete(businessesController.remove);

module.exports = router;