const Database = require('./database');
const Module = function (module) {
    this.title = module.title;
    this.collapsed = module.collapsed;
};

Module.create = async (module) => {
    try {
        module.project = 1;
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

Module.getByProject = async (project) => {
    try {
        return await Database.query('SELECT * FROM Modules WHERE project = ?', project);
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
        let keys = Object.keys(module);
        let vals = Object.values(module);
        let indexId = keys.indexOf('id');
        keys.splice(indexId, 1);
        vals.splice(indexId, 1);
        let res = await Database.query('UPDATE Modules SET ' + keys.join(' = ? ,') + ' = ? WHERE id = ?', [...vals, id]);
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


Module.deleteByProject = async (project) => {
    try {
        let res = await Database.query('DELETE FROM Modules WHERE project = ?', project);
        if (res.affectedRows == 0)
            return 'No Modules deleted';
        else
            return 'Modules deleted.';
    }
    catch (err) {
        console.log('An errror has occured while trying to DELETE Modules.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

module.exports = Module;