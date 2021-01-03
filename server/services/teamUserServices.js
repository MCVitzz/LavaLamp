const TeamUser = require('../models/teamUserModel');

class TeamUserServices {

    static async getAll() {
        return await TeamUser.getAll();
    }

    static async getById(userId, teamId) {
        return await TeamUser.getById(userId, teamId);
    }

    static async getByTeam(team) {
        return await TeamUser.getByTeam(team);
    }

    static async getByUser(user) {
        return await TeamUser.getByUser(user);
    }

    static async create(teamUser) {
        return await TeamUser.create(teamUser);
    }

    static async delete(teamId, userId) {
        return await TeamUser.delete(teamId, userId);
    }

    static async update(teamId, userId, teamUser) {
        return await TeamUser.update(teamId, userId, teamUser);
    }

    static async deleteByUser(userId) {
        return await TeamUser.deleteByUser(userId);
    }

    static async deleteByTeam(teamId) {
        return await TeamUser.deleteByTeam(teamId);
    }
}

module.exports = TeamUserServices;