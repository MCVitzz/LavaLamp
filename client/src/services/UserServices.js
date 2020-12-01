import axios from 'axios';
const url = '/api/users';


/* eslint-disable no-async-promise-executor */
class UserServices {
    //Get all users
    static async getAllUsers() {

        try {
            let res = await axios.get(url);
            let data = res.data;
            if (data != 'No Users.') {
                return data;
            }
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    //Add User
    static async addUser(user) {
        try {
            const res = await axios.post(`${url}/add`, { 'email': user });
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

    //Update User
    static async updateUser(user) {
        try {
            const res = await axios.put(`${url}/update/${user._id}`, user);
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

    //Delete User
    static async deleteUser(user) {
        try {
            const res = await axios.delete(`${url}/delete/${user._id}`);
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

export default UserServices;