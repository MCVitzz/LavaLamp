const Project = require('../models/projectModel');

class ProjectServices {

    static async getAll() {
        return await Project.getAll();
    }

    static async getById(id) {
        return await Project.getById(id);
    }

    static async create(project) {
        return await Project.create(project);
    }

    static async delete(id) {
        return await Project.delete(id);
    }

    static async update(id, project) {
        return await Project.update(id, project);
    }
}

module.exports = ProjectServices;