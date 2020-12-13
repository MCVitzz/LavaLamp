const Address = require('../models/addressModel');

class AddressServices {

    static async getAll() {
        return await Address.getAll();
    }

    static async getById(id) {
        return await Address.getById(id);
    }

    static async create(address) {
        return await Address.create(address);
    }

    static async delete(id) {
        return await Address.delete(id);
    }

    static async update(id, address) {
        return await Address.update(id, address);
    }
}

module.exports = AddressServices;