const ProjectUser = require('../models/projectUserModel');

class ProjectUserServices {

    static async getAll() {
        return await ProjectUser.getAll();
    }

    static async getById(id) {
        return await ProjectUser.getById(id);
    }

    static async create(projectUser) {
        return await ProjectUser.create(projectUser);
    }

    static async delete(id) {
        return await ProjectUser.delete(id);
    }

    static async update(id, projectUser) {
        return await ProjectUser.update(id, projectUser);
    }

    static async getByUser(userId) {
        return await ProjectUser.getByUser(userId);
    }

    static async getByProject(projectId) {
        return await ProjectUser.getByProject(projectId);
    }
}

module.exports = ProjectUserServices;