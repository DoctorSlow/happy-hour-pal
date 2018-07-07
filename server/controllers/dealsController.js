const db = require("../db/models");

// Defining methods for the dealsController
module.exports = {

  // findDeals: function(req, res) {
  //   db.Deal
  //     .find({ googleID: req.params.id})
  //     .sort({ day: 1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  findAllDeals: function(req,res) {
    db.Deal
      .find(req.query)
      // .sort({ googleID: 1})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
//   createDeal: function(req, res) {
//     db.Deal
//       .create(req.body)
//       .then(function(dbDeal) {
//         return db.Business.findOneAndUpdate(
//           {_id: req.params.id},
//           {$push:
//               {deals: dbDeal._id}
//           },
//           {new: true }
//         )
//         .then(function(dbBusiness) {
//           console.log(dbBusiness)
//           res.json(dbBusiness);
//         })
//         .catch(function(error) {
//           res.json(error);
//         });
//       });
//   }
};