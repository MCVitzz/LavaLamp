import axios from 'axios';

const url = '/api/projects';

/* eslint-disable no-async-promise-executor */

class ProjectServices {
    //Get all projects
    static async getAllProjects() {

        try {
            let res = await axios.get(url);
            let data = res.data;
            if (data != 'No Projects.') {
                return data;
            }
        }
        catch (err) {
            console.error(err);

            return [];
        }
    }

    //Get Project by Id
    static async getById(id) {
        try {
            let res = await axios.get(`${url}/${id}`);
            let data = res.data;
            if (data != 'No Project found.')
                return data;
        }
        catch (err) {
            console.log(err);
        }
        return {};
    }

    //Get Current
    static async getCurrent() {
        let id = sessionStorage.getItem('current-project');
        return await this.getById(id);
    }

    //Get Projects by Module
    static async getProjectsByModule(module) {
        try {
            let res = await axios.get(`${url}/getByModule/${module}`);
            let data = res.data;
            if (data != 'No Projects.') {
                return data;
            }
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }

    //Add Project
    static async addProject(project) {
        try {
            const res = await axios.post(`${url}`, project);
            if (res.status == 200) {
                let proj = parseInt(res.data.substring(24).slice(0, -1));
                sessionStorage.setItem('current-project', proj);
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

    //Update Project
    static async updateProject(project) {
        try {
            project.dueDate = formatDate(project.dueDate);
            const res = await axios.put(`${url}/${project.id}`, project);
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

    //Delete Project
    static async deleteProject(project) {
        try {
            const res = await axios.delete(`${url}/${project}`);
            console.log(res);
            if (res.status == 200) {
                return 'OK';
            }
            else {
                return res;
            }
        }
        catch (err) {
            if (err.response.status == 403) {
                return '403';
            }
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

export default ProjectServices;