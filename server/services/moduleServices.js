const Module = require('../models/moduleModel');

class ModuleServices {

    static async getAll() {
        return await Module.getAll();
    }

    static async getById(id) {
        return await Module.getById(id);
    }

    static async create(module) {
        return await Module.create(module);
    }

    static async delete(id) {
        return await Module.delete(id);
    }

    static async update(id, module) {
        return await Module.update(id, module);
    }
}

module.exports = ModuleServices;