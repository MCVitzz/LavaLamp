const Database = require('./database');
const TeamUser = function (teamUser) {
    this.user = teamUser.user;
    this.team = teamUser.team;
    this.role = teamUser.role;
};

TeamUser.create = async (teamUser) => {
    try {
        let res = await Database.query('INSERT INTO TeamUsers SET ?', teamUser);
        return { id: res.insertId, ...teamUser };
    }
    catch (err) {
        console.log('An errror has occured while trying to INSERT into TeamUsers.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

TeamUser.getById = async (teamId, userId) => {
    try {
        let res = await Database.query('SELECT * FROM TeamUsers WHERE team = ? AND user = ?', [teamId, userId]);
        if (res.length) {
            return res[0];
        }
        else
            return 'Not Found';
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from TeamUsers.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

TeamUser.getAll = async () => {
    try {
        return await Database.query('SELECT * FROM TeamUsers');
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from TeamUsers.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

TeamUser.getByTeam = async (teamId) => {
    try {
        let res = await Database.query('SELECT * FROM TeamUsers WHERE team = ?', teamId);
        if (res.length) {
            return res;
        }
        else
            return 'Not Found';
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT FROM TeamUsers.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
}

TeamUser.getByUser = async (userId) => {
    try {
        let res = await Database.query('SELECT * FROM TeamUsers WHERE user = ?', userId);
        if (res.length) {
            return res;
        }
        else
            return 'Not Found';
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT FROM TeamUsers.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
}

TeamUser.update = async (teamId, userId, teamUser) => {
    try {
        let keys = Object.keys(teamUser);
        let vals = Object.values(teamUser);

        let indexUserId = keys.indexOf('user');
        keys.splice(indexUserId, 1);
        vals.splice(indexUserId, 1);

        let indexTeamId = keys.indexOf('team');
        keys.splice(indexTeamId, 1);
        vals.splice(indexTeamId, 1);

        let res = await Database.query('UPDATE TeamUsers SET ' + keys.join(' = ? ,') + ' = ? WHERE team = ? AND user = ?', [...vals, teamId, userId]);
        if (res.affectedRows == 0)
            return 'No TeamUsers updated';
        else
            return 'TeamUser updated.';
    }
    catch (err) {
        console.log('An errror has occured while trying to UPDATE Teams.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

TeamUser.delete = async (teamId, userId) => {
    try {
        let res = await Database.query('DELETE FROM TeamUsers WHERE team = ? AND user = ?', [teamId, userId]);
        if (res.affectedRows == 0)
            return 'No TeamUsers deleted';
        else
            return 'TeamUser deleted.';
    }
    catch (err) {
        console.log('An errror has occured while trying to DELETE TeamUsers.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

TeamUser.deleteByTeam = async (teamId) => {
    try {
        let res = await Database.query('DELETE FROM TeamUsers WHERE team = ?', teamId);
        if (res.affectedRows == 0)
            return 'No TeamUsers deleted';
        else
            return 'TeamUser deleted.';
    }
    catch (err) {
        console.log('An errror has occured while trying to DELETE TeamUsers.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

TeamUser.deleteByUser = async (userId) => {
    try {
        let res = await Database.query('DELETE FROM TeamUsers WHERE user = ?', userId);
        if (res.affectedRows == 0)
            return 'No TeamUsers deleted';
        else
            return 'TeamUser deleted.';
    }
    catch (err) {
        console.log('An errror has occured while trying to DELETE TeamUsers.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

module.exports = TeamUser;