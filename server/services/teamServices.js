const Team = require('../models/teamModel');

class TeamServices {

    static async getAll() {
        return await Team.getAll();
    }

    static async getById(id) {
        return await Team.getById(id);
    }

    static async create(team) {
        return await Team.create(team);
    }

    static async delete(id) {
        return await Team.delete(id);
    }

    static async update(id, team) {
        return await Team.update(id, team);
    }
}

module.exports = TeamServices;