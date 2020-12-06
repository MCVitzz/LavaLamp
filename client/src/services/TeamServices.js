import axios from 'axios';
const url = '/api/teams';


/* eslint-disable no-async-promise-executor */
class TeamServices {
    //Get all teams
    static async getAllTeams() {

        try {
            let res = await axios.get(url);
            let data = res.data;
            if (data != 'No Teams.') {
                return data;
            }
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    //Add Team
    static async addTeam(team) {
        try {
            const res = await axios.post(`${url}`, { 'name': team });
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
            const res = await axios.put(`${url}/${team._id}`, team);
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
            const res = await axios.delete(`${url}/${team._id}`);
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