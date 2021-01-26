import axios from 'axios';
const url = '/api/teamUsers';


/* eslint-disable no-async-promise-executor */
class TeamUserServices {

    //Get all teamUsers
    static async getAllTeamUsers() {

        try {
            let res = await axios.get(url);
            let data = res.data;
            if (res.status == 200) {
                return data;
            }
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    //Get TeamUser by Id
    static async getById(userId, teamId) {
        try {
            let res = await axios.get(`${url}/${userId}/${teamId}`);
            let data = res.data;
            if (res.status == 200) {
                return data;
            }
        }
        catch (err) {
            console.error(err);
        }
        return {};
    }

    //Get TeamUser by Team
    static async getByTeam(id) {
        try {
            let res = await axios.get(`${url}/getByTeam/${id}`);
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

    //Get TeamUser by User
    static async getByUser(id) {
        try {
            let res = await axios.get(`${url}/getByUser/${id}`);
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

    //Add TeamUser
    static async addTeamUser(user, team) {
        try {
            const res = await axios.post(`${url}`, { user: user, team: team });
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

    //Update TeamUser
    static async updateTeamUser(user) {
        try {
            const res = await axios.put(`${url}/${user.team}/${user.user}`, user);
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

    //Delete TeamUser
    static async deleteTeamUser(user) {
        try {
            const res = await axios.delete(`${url}/${user.team}/${user.user}`);
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

    //Delete by Team
    static async deleteByTeam(team) {
        try {
            const res = await axios.delete(`${url}/deleteByTeam/${team}`);
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

export default TeamUserServices;