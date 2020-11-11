const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255
    },
    description: {
        type: String,
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
    }
});

module.exports = mongoose.model('tasks', taskSchema);