const db = require("../db/models");

// Defining methods for the businessesController
module.exports = {
  findAll: function(req, res) {
    db.Business
      .find(req.query)
      .sort({ name: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Business
      .findById(req.params.id)
      //.populate("deals")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findDeals: function(req, res) {
    db.Deal
      .find({ googleID: req.params.id})
      .sort({ day: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Business
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createDeal: function(req, res) {
    db.Deal
      .create(req.body)
      .then(function(dbDeal) {
        return db.Business.findOneAndUpdate(
          {_id: req.params.id},
          {$push:
              {deals: dbDeal._id}
          },
          {new: true }
        )
        .then(function(dbBusiness) {
          console.log(dbBusiness)
          res.json(dbBusiness);
        })
        .catch(function(error) {
          res.json(error);
        });
      });
  },
  update: function(req, res) {
    db.Business
      .findOneAndUpdate(
        { _id: req.params.id },
        {$push:
          {deals: dbDeal._id}
        },
        {new: true}
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Business
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};