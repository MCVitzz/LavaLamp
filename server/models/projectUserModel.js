const Database = require('./database');
const ProjectUser = function (projectUser) {
    this.title = projectUser.title;
    this.description = projectUser.description;
};

ProjectUser.create = async (projectUser) => {
    try {
        let res = await Database.query('INSERT INTO ProjectUsers SET ?', projectUser);
        return { id: res.insertId, ...projectUser };
    }
    catch (err) {
        console.log('An errror has occured while trying to INSERT into ProjectUsers.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

ProjectUser.getById = async (id) => {
    try {
        let res = await Database.query('SELECT * FROM ProjectUsers WHERE id = ?', id);
        if (res.length) {
            return res[0];
        }
        else
            return 'Not Found';
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from ProjectUsers.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

ProjectUser.getByProject = async (projectId) => {
    try {
        let res = await Database.query('SELECT * FROM ProjectUsers WHERE project = ?', projectId);
        return res;
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from ProjectUsers.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

ProjectUser.getByUser = async (userId) => {
    try {
        let res = await Database.query('SELECT * FROM ProjectUsers WHERE user = ?', userId);
        return res;
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from ProjectUsers.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

ProjectUser.getAll = async () => {
    try {
        return await Database.query('SELECT * FROM ProjectUsers');
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from ProjectUsers.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

ProjectUser.update = async (id, projectUser) => {
    try {
        let keys = Object.keys(projectUser);
        let vals = Object.values(projectUser);
        let indexId = keys.indexOf('id');
        if (indexId != -1) {
            keys.splice(indexId, 1);
            vals.splice(indexId, 1);
        }
        let res = await Database.query('UPDATE ProjectUsers SET ' + keys.join(' = ? ,') + ' = ? WHERE id = ?', [...vals, id]);
        if (res.affectedRows == 0)
            return 'No ProjectUsers updated';
        else
            return 'ProjectUser updated.';
    }
    catch (err) {
        console.log('An errror has occured while trying to UPDATE ProjectUsers.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

ProjectUser.delete = async (id) => {
    try {
        let res = await Database.query('DELETE FROM ProjectUsers WHERE id = ?', id);
        if (res.affectedRows == 0)
            return 'No ProjectUsers deleted';
        else
            return 'ProjectUser deleted.';
    }
    catch (err) {
        console.log('An errror has occured while trying to DELETE ProjectUsers.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

module.exports = ProjectUser;