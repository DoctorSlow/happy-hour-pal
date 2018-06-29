const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var businessSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    link: String,
    description: String,
    updated_date: { type: Date, default: Date.now },
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;