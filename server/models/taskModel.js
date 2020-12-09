const Database = require('./database');
const Task = function (task) {
    this.title = task.title;
    this.module = task.module;
    this.state = task.state;
    this.dueDate = task.dueDate;
    this.priority = task.priority;
    this.owner = task.owner;
};

Task.create = async (task) => {
    try {
        let res = await Database.query('INSERT INTO Tasks SET ?', task);
        return { id: res.insertId, ...task };
    }
    catch (err) {
        console.log('An errror has occured while trying to INSERT into Tasks.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Task.getById = async (id) => {
    try {
        let res = await Database.query('SELECT * FROM Tasks WHERE id = ?', id);
        if (res.length) {
            return res[0];
        }
        else
            return 'Not Found';
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from Tasks.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Task.getByModule = async (module) => {
    try {
        let res = await Database.query('SELECT * FROM Tasks WHERE Module = ?', module);
        if (res.length) {
            return res;
        }
        else
            return 'Not Found';
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT FROM Tasks.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
}

Task.getAll = async () => {
    try {
        return await Database.query('SELECT * FROM Tasks');
    }
    catch (err) {
        console.log('An errror has occured while trying to SELECT from Tasks.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Task.update = async (id, task) => {
    try {
        let res = await Database.query('UPDATE Tasks SET ' + Object.keys(task).join('" = ? ,"') + ' = ? WHERE id = ?', [Object.values(task), id]);
        if (res.affectedRows == 0)
            return 'No Tasks updated';
        else
            return 'Task updated.';
    }
    catch (err) {
        console.log('An errror has occured while trying to UPDATE Tasks.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

Task.delete = async (id) => {
    try {
        let res = await Database.query('DELETE FROM Tasks WHERE id = ?', id);
        if (res.affectedRows == 0)
            return 'No Tasks deleted';
        else
            return 'Task deleted.';
    }
    catch (err) {
        console.log('An errror has occured while trying to DELETE Tasks.\n Dumping Stack.\n', err.stack);
        return err.message;
    }
};

module.exports = Task;