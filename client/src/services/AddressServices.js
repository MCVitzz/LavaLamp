import axios from 'axios';
const url = '/api/addresses';


/* eslint-disable no-async-promise-executor */
class AddressServices {
    //Get all addresses
    static async getAllAddresses() {

        try {
            let res = await axios.get(url);
            let data = res.data;
            if (data != 'No Addresses.') {
                return data;
            }
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    //Get Address
    static async getAddress(id) {
        try {
            let res = await axios.get(`${url}/${id}`);
            let data = res.data;
            if (data != 'No Addresses.') {
                return data;
            }
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    //Add Address
    static async addAddress(address) {
        try {
            const res = await axios.post(url, address);
            if (res.status == 200) {
                return res.data.id;
            }
            else {
                return res.data;
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    //Update Address
    static async updateAddress(address) {
        try {
            const res = await axios.put(`${url}/${address.id}`, address);
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

    //Delete Address
    static async deleteAddress(address) {
        try {
            const res = await axios.delete(`${url}/${address.id}`);
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

export default AddressServices;