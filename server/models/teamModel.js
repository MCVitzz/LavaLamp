const Database = require('./database');
const Team = function (team) {
    this.id = team.id;
    this.name = team.name;
    this.project = team.project;
    this.description = team.description;
    this.leader = team.leader;
};

Team.create = async (team) => {
    try {
        let res = await Database.query('INSERT INTO Teams SET ?', team);
        return { id: res.insertId, ...team };
    }
    catch (err) {
        console.log('An errror has occured while trying to INSERT into Teams.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Team.getById = async (id) => {
    try {
        let res = await Database.query('SELECT * FROM Teams WHERE id = ?', id);
        if (res.length) {
            return res[0];
        }
        else
            return 'Not Found';
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from Teams.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Team.getAll = async () => {
    try {
        return await Database.query('SELECT * FROM Teams');
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from Teams.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Team.getByProject = async (project) => {
    try {
        return await Database.query('SELECT * FROM Teams WHERE project = ?', project);
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from Teams.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Team.update = async (id, team) => {
    try {
        let keys = Object.keys(team);
        let vals = Object.values(team);
        let indexId = keys.indexOf('id');
        keys.splice(indexId, 1);
        vals.splice(indexId, 1);
        let res = await Database.query('UPDATE Teams SET ' + keys.join(' = ? ,') + ' = ? WHERE id = ?', [...vals, id]);
        if (res.affectedRows == 0)
            return 'No Teams updated';
        else
            return 'Team updated.';
    }
    catch (err) {
        console.log('An errror has occured while trying to UPDATE Teams.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Team.delete = async (id) => {
    try {
        let res = await Database.query('DELETE FROM Teams WHERE id = ?', id);
        if (res.affectedRows == 0)
            return 'No Teams deleted';
        else
            return 'Team deleted.';
    }
    catch (err) {
        console.log('An errror has occured while trying to DELETE Teams.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

module.exports = Team;