const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 255
    },
    description: {
        type: String,
        required: true,
    },
    leader: {
        type: Schema.Types.ObjectId,
    },
});

module.exports = mongoose.model('teams', teamSchema);