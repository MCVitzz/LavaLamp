const Database = require('./database');
const Address = function (address) {
    this.title = address.title;
    this.address = address.address;
    this.state = address.state;
    this.dueDate = address.dueDate;
    this.priority = address.priority;
    this.owner = address.owner;
};

Address.create = async (address) => {
    try {
        let res = await Database.query('INSERT INTO Addresses SET ?', address);
        return { id: res.insertId, ...address };
    }
    catch (err) {
        console.log('An errror has occured while trying to INSERT into Addresses.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Address.getById = async (id) => {
    try {
        let res = await Database.query('SELECT * FROM Addresses WHERE id = ?', id);
        if (res.length) {
            return res[0];
        }
        else
            return 'Not Found';
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from Addresses.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Address.getAll = async () => {
    try {
        return await Database.query('SELECT * FROM Addresses');
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from Addresses.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Address.update = async (id, address) => {
    try {
        let keys = Object.keys(address);
        let vals = Object.values(address);
        let indexId = keys.indexOf('id');
        keys.splice(indexId, 1);
        vals.splice(indexId, 1);
        let res = await Database.query('UPDATE Addresses SET ' + keys.join(' = ? ,') + ' = ? WHERE id = ?', [...vals, id]);
        if (res.affectedRows == 0)
            return 'No Addresses updated';
        else
            return 'Address updated.';
    }
    catch (err) {
        console.log('An errror has occured while trying to UPDATE Addresses.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Address.delete = async (id) => {
    try {
        let res = await Database.query('DELETE FROM Addresses WHERE id = ?', id);
        if (res.affectedRows == 0)
            return 'No Addresses deleted';
        else
            return 'Address deleted.';
    }
    catch (err) {
        console.log('An errror has occured while trying to DELETE Addresses.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

module.exports = Address;