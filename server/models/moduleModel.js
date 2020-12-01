const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255
    },
    description: {
        type: String,
    },
    collapsed: {
        type: Boolean,
    },
});

module.exports = mongoose.model('modules', moduleSchema);