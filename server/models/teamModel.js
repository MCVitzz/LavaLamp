const Database = require('./database');
const Team = function (team) {
    this.title = team.title;
    this.team = team.team;
    this.state = team.state;
    this.dueDate = team.dueDate;
    this.priority = team.priority;
    this.owner = team.owner;
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

Team.update = async (id, team) => {
    try {
        let res = await Database.query('UPDATE Teams SET ' + Object.keys(team).join('" = ? ,"') + ' = ? WHERE id = ?', [Object.values(team), id]);
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