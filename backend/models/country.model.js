const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    username: { type: String, required: true },
    countryName: { type: String, required: true },
    capital: { type: String, required: true },
    countryCode: { type: String, required: true },

}, {
    timestamps: true,
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;