const User = require('../models/userModel');

class UserServices {

    static async getAll() {
        return await User.getAll();
    }

    static async getById(id) {
        return await User.getById(id);
    }

    static async getByTeam(team) {
        return await User.getByTeam(team);
    }

    static async create(user) {
        return await User.create(user);
    }

    static async delete(id) {
        return await User.delete(id);
    }

    static async update(id, user) {
        return await User.update(id, user);
    }
}

module.exports = UserServices;