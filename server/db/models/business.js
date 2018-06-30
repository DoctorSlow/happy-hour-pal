const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var businessSchema = new Schema({
    googleID: { type: String, unique: true },
    name: { type: String, unique: true, required: true },
    // address: { type: String, required: true },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    deals: [
        {
            type: Schema.Types.ObjectId,
            ref: "Deal"
        }
    ],
    updated_date: { type: Date, default: Date.now },
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;