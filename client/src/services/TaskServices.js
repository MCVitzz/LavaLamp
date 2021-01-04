import axios from 'axios';

const url = '/api/tasks';

/* eslint-disable no-async-promise-executor */

class TaskServices {
    //Get all tasks
    static async getAllTasks() {

        try {
            let res = await axios.get(url);
            let data = res.data;
            if (data != 'No Tasks.') {
                return data;
            }
        }
        catch (err) {
            console.error(err);

            return [];
        }
    }

    //Get Task by Id
    static async getById(id) {
        try {
            let res = await axios.get(`${url}/${id}`);
            let data = res.data;
            if (data != 'No Task found.')
                return data;
        }
        catch (err) {
            console.log(err);
        }
        return {};
    }

    //Get Tasks by Module
    static async getTasksByModule(module) {
        try {
            let res = await axios.get(`${url}/getByModule/${module}`);
            let data = res.data;
            if (data != 'No Tasks.') {
                return data;
            }
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }

    //Add Task
    static async addTask(task) {
        try {
            const res = await axios.post(`${url}`, task);
            if (res.status == 200) {
                return 'OK';
            }
            else {
                return res;
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    //Update Task
    static async updateTask(task) {
        try {
            task.dueDate = formatDate(task.dueDate);
            const res = await axios.put(`${url}/${task.id}`, task);
            if (res.status == 200) {
                return 'OK';
            }
            else {
                return res;
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    //Delete Task
    static async deleteTask(task) {
        try {
            const res = await axios.delete(`${url}/${task.id}`);
            if (res.status == 200) {
                return 'OK';
            }
            else {
                return res;
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}

let formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export default TaskServices;