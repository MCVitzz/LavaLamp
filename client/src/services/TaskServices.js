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
            const res = await axios.put(`${url}/${task._id}`, task);
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
            const res = await axios.delete(`${url}/${task._id}`);
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

export default TaskServices;