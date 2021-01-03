const Task = require('../models/taskModel');

class TaskServices {

    static async getAll() {
        return await Task.getAll();
    }

    static async getById(id) {
        return await Task.getById(id);
    }

    static async create(task) {
        return await Task.create(task);
    }

    static async delete(id) {
        return await Task.delete(id);
    }

    static async update(id, task) {
        return await Task.update(id, task);
    }

    static async getByModule(moduleId) {
        return await Task.getByModule(moduleId);
    }
}

module.exports = TaskServices;