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

    static async setCurrent(user, project) {
        return await ProjectUser.setCurrent(user, project);
    }

    static async getByUser(userId) {
        return await ProjectUser.getByUser(userId);
    }

    static async getByProject(projectId) {
        return await ProjectUser.getByProject(projectId);
    }

    static async getCurrentForUser(user) {
        return await ProjectUser.getCurrentForUser(user);
    }

    static async setAllToCurrentProjectFalse(user) {
        return await ProjectUser.setAllToCurrentProjectFalse(user);
    }

    static async deleteByProject(project) {
        return await ProjectUser.deleteByProject(project);
    }
}

module.exports = ProjectUserServices;