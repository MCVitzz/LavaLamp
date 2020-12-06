const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255
    },
    description: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId
    },
    dueDate: {
        type: Date,
    },
    priority: {
        type: String,
    },
    state: {
        type: String,
        required: true,
    },
    module: {
        type: Schema.Types.ObjectId
    },

});

module.exports = mongoose.model('tasks', taskSchema);