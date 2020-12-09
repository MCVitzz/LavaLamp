const Database = require('./database');
const Module = function (module) {
    this.title = module.title;
    this.module = module.module;
    this.state = module.state;
    this.dueDate = module.dueDate;
    this.priority = module.priority;
    this.owner = module.owner;
};

Module.create = async (module) => {
    try {
        let res = await Database.query('INSERT INTO Modules SET ?', module);
        return { id: res.insertId, ...module };
    }
    catch (err) {
        console.log('An errror has occured while trying to INSERT into Modules.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Module.getById = async (id) => {
    try {
        let res = await Database.query('SELECT * FROM Modules WHERE id = ?', id);
        if (res.length) {
            return res[0];
        }
        else
            return 'Not Found';
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from Modules.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Module.getAll = async () => {
    try {
        return await Database.query('SELECT * FROM Modules');
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from Modules.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Module.update = async (id, module) => {
    try {
        let res = await Database.query('UPDATE Modules SET ' + Object.keys(module).join('" = ? ,"') + ' = ? WHERE id = ?', [Object.values(module), id]);
        if (res.affectedRows == 0)
            return 'No Modules updated';
        else
            return 'Module updated.';
    }
    catch (err) {
        console.log('An errror has occured while trying to UPDATE Modules.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Module.delete = async (id) => {
    try {
        let res = await Database.query('DELETE FROM Modules WHERE id = ?', id);
        if (res.affectedRows == 0)
            return 'No Modules deleted';
        else
            return 'Module deleted.';
    }
    catch (err) {
        console.log('An errror has occured while trying to DELETE Modules.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

module.exports = Module;