const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var businessSchema = new Schema({
    name: { type: String, required: true },
    day: { type: String, required: true },
    beginTime: { type: String, required: true },
    endTime: { type: String, required: true },
    info: { type: String, required: true },
    updated_date: { type: Date, default: Date.now },
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;