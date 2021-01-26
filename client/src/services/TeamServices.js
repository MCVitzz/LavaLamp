import axios from 'axios';
const url = '/api/teams';


/* eslint-disable no-async-promise-executor */
class TeamServices {
    //Get all teams
    static async getAllTeams() {

        try {
            let res = await axios.get(url);
            let data = res.data;
            if (res.status == 200) {
                return data;
            }
        }
        catch (err) {
            console.error(err);
        }
        return [];
    }

    //Get teams by Project
    static async getByProject(project) {

        try {
            let res = await axios.get(`${url}/getByProject/${project}`);
            let data = res.data;
            if (res.status == 200) {
                return data;
            }
        }
        catch (err) {
            console.error(err);
            return [];
        }
        return [];
    }

    //Get teams by Project
    static async getByCurrentProject() {
        let project = sessionStorage.getItem('current-project');
        return await this.getByProject(project);
    }

    //Add Team
    static async addTeam(team) {
        try {
            const res = await axios.post(`${url}`, { name: team, project: sessionStorage.getItem('current-project') });
            if (res.status == 200) {
                return 'OK';
            }
            else {
                return res.data;
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    //Update Team
    static async updateTeam(team) {
        try {
            const res = await axios.put(`${url}/${team.id}`, team);
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

    //Delete Team
    static async deleteTeam(team) {
        try {
            const res = await axios.delete(`${url}/${team.id}`);
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

export default TeamServices;