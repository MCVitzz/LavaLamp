import axios from 'axios';
const url = '/api/modules';


/* eslint-disable no-async-promise-executor */
class ModuleServices {
    //Get all modules
    static async getAllModules() {

        try {
            let res = await axios.get(url);
            let data = res.data;
            if (data != 'No Modules.') {
                return data;
            }
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    //Add Module
    static async addModule(module) {
        try {
            const res = await axios.post(url, { 'title': module, collapsed: true });
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

    //Update Module
    static async updateModule(module) {
        try {
            const res = await axios.put(`${url}/${module._id}`, module);
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

    //Delete Module
    static async deleteModule(module) {
        try {
            const res = await axios.delete(`${url}/${module._id}`);
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

export default ModuleServices;