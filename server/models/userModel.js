const Database = require('./database');
const User = function (user) {
    this.title = user.title;
    this.user = user.user;
    this.state = user.state;
    this.dueDate = user.dueDate;
    this.priority = user.priority;
    this.owner = user.owner;
};

User.create = async (user) => {
    try {
        let res = await Database.query('INSERT INTO Users SET ?', user);
        return { id: res.insertId, ...user };
    }
    catch (err) {
        console.log('An errror has occured while trying to INSERT into Users.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

User.getById = async (id) => {
    try {
        let res = await Database.query('SELECT * FROM Users WHERE id = ?', id);
        if (res.length) {
            return res[0];
        }
        else
            return 'Not Found';
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from Users.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

User.getAll = async () => {
    try {
        return await Database.query('SELECT * FROM Users');
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from Users.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

User.getByTeam = async (user) => {
    try {
        let res = await Database.query('SELECT * FROM Users WHERE Team = ?', user);
        if (res.length) {
            return res;
        }
        else
            return 'Not Found';
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT FROM Users.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
}

User.update = async (id, user) => {
    try {
        let keys = Object.keys(user);
        let vals = Object.values(user);
        let indexId = keys.indexOf('id');
        keys.splice(indexId, 1);
        vals.splice(indexId, 1);
        let res = await Database.query('UPDATE Users SET ' + keys.join(' = ? ,') + ' = ? WHERE id = ?', [...vals, id]);
        if (res.affectedRows == 0)
            return 'No Users updated';
        else
            return 'User updated.';
    }
    catch (err) {
        console.log('An errror has occured while trying to UPDATE Users.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

User.delete = async (id) => {
    try {
        let res = await Database.query('DELETE FROM Users WHERE id = ?', id);
        if (res.affectedRows == 0)
            return 'No Users deleted';
        else
            return 'User deleted.';
    }
    catch (err) {
        console.log('An errror has occured while trying to DELETE Users.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

module.exports = User;