const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const poiSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    rating: { type: mongoose.Decimal128, required: true },
    type: { type: String, required: true },
    country: { type: String, required: true },

}, {
    timestamps: true,
});

const Poi = mongoose.model('Poi', poiSchema);

module.exports = Poi;