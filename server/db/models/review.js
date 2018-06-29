var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ReviewSchema object
var ReviewSchema = new Schema({
    // name: { type: String, required: true },
    score: { type: Number,
        min: 1,
        max: 5,
        required: true },
    details: { type: String, required: true },
    updated_date: { type: Date, default: Date.now },
});

// Creates our model from the above schema, using mongoose's model method
var Review = mongoose.model("Review", ReviewSchema);

// Export the Deal model
module.exports = Review;