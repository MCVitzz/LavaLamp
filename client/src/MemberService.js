import axios from 'axios';

const url = 'http://localhost:5000/api/members/';

/* eslint-disable no-async-promise-executor */

class MemberService {
    //Get Members
    static getMembers() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(member => ({ ...member }))
                );
            }
            catch (err) {
                reject(err);
            }
        })
    }

    //Add Member
    static insertMember(member) {
        return axios.post(url, member);
    }

    //Delete Member
    static deleteMember(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default MemberService;