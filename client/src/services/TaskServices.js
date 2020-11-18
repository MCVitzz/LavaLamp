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

    //Add Task
    static async addTask(task) {
        try {
            const res = await axios.post(`${url}/add`, { 'title': task });
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
    static async updateTask(prop) {
        try {
            let task = {};
            task._id = prop._id;
            task.title = prop.title;
            task.description = prop.description;
            task.dueDate = prop.dueDate;
            task.priority = prop.priority;
            task.state = prop.state;
            const res = await axios.put(`${url}/update/${task._id}`, task);
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
            const res = await axios.delete(`${url}/delete/${task._id}`);
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