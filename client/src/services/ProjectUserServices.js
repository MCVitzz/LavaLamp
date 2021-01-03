import axios from 'axios';
const url = '/api/projectUsers';


/* eslint-disable no-async-promise-executor */
class ProjectUserServices {

    //Get all projectUsers
    static async getAllProjectUsers() {

        try {
            let res = await axios.get(url);
            let data = res.data;
            if (data != 'No ProjectUsers.') {
                return data;
            }
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    //Get ProjectUser by Id
    static async getById(userId, projectId) {
        try {
            let res = await axios.get(`${url}/${userId}/${projectId}`);
            let data = res.data;
            if (data != 'No ProjectUsers.') {
                return data;
            }
        }
        catch (err) {
            console.error(err);
        }
        return {};
    }

    //Get ProjectUser by Project
    static async getByProject(id) {
        try {
            let res = await axios.get(`${url}/getByProject/${id}`);
            let data = res.data;
            if (data != 'No ProjectUsers.') {
                return data;
            }
        }
        catch (err) {
            console.error(err);
        }
        return [];
    }

    //Get ProjectUser by User
    static async getByUser(id, deep) {
        try {
            let res = await axios.get(`${url}/getByUser/${id}/${deep ?? 'deep'}`);
            let data = res.data;
            if (data != 'No ProjectUsers.') {
                return data;
            }
        }
        catch (err) {
            console.error(err);
        }
        return [];
    }

    //Add ProjectUser
    static async addProjectUser(user, project) {
        try {
            const res = await axios.post(`${url}`, { user: user, project: project });
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

    //Update ProjectUser
    static async updateProjectUser(user) {
        try {
            const res = await axios.put(`${url}/${user.project}/${user.user}`, user);
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

    //Delete ProjectUser
    static async deleteProjectUser(user) {
        try {
            const res = await axios.delete(`${url}/${user.project}/${user.user}`);
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

    //Delete by Project
    static async deleteByProject(project) {
        try {
            const res = await axios.delete(`${url}/deleteByProject/${project}`);
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

export default ProjectUserServices;