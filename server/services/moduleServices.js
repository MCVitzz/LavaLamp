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

    static async getByProject(project) {
        return await Module.getByProject(project);
    }

    static async deleteByProject(project) {
        return await Module.deleteByProject(project);
    }
}

module.exports = ModuleServices;