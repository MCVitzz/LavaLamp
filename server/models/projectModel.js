const Database = require('./database');
const Project = function (project) {
    this.title = project.title;
    this.description = project.description;
    this.owner = project.owner;
};

Project.create = async (project) => {
    try {
        let res = await Database.query('INSERT INTO Projects SET ?', project);
        return { id: res.insertId, ...project };
    }
    catch (err) {
        console.log('An errror has occured while trying to INSERT into Projects.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Project.getById = async (id) => {
    try {
        let res = await Database.query('SELECT * FROM Projects WHERE id = ?', id);
        if (res.length) {
            return res[0];
        }
        else
            return 'Not Found';
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from Projects.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Project.getAll = async () => {
    try {
        return await Database.query('SELECT * FROM Projects');
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from Projects.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Project.update = async (id, project) => {
    try {
        let keys = Object.keys(project);
        let vals = Object.values(project);
        let indexId = keys.indexOf('id');
        if (indexId != -1) {
            keys.splice(indexId, 1);
            vals.splice(indexId, 1);
        }
        let res = await Database.query('UPDATE Projects SET ' + keys.join(' = ? ,') + ' = ? WHERE id = ?', [...vals, id]);
        if (res.affectedRows == 0)
            return 'No Projects updated';
        else
            return 'Project updated.';
    }
    catch (err) {
        console.log('An errror has occured while trying to UPDATE Projects.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Project.delete = async (id) => {
    try {
        let res = await Database.query('DELETE FROM Projects WHERE id = ?', id);
        if (res.affectedRows == 0)
            return 'No Projects deleted';
        else
            return 'Project deleted.';
    }
    catch (err) {
        console.log('An errror has occured while trying to DELETE Projects.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

module.exports = Project;