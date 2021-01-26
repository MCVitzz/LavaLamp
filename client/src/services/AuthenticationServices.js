import axios from 'axios';
import ProjectUserServices from './ProjectUserServices';

const url = '/api/authentication';

class AuthenticationServices {
    static async login(email, password) {
        try {
            let res = await axios.post(`${url}/login`, {
                email: email,
                password: password,
            });
            sessionStorage.setItem('auth-token', res.data);
            let current = await ProjectUserServices.getCurrentForUser();
            if (current.project) {
                sessionStorage.setItem('current-project', current.project);
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }

    static async register(user) {
        try {
            await axios.post(`${url}/register`, user);
            return 'OK';
        } catch (err) {
            return err.response.status == 400 ? err.response : { data: 'Something went wrong 😭, please try again later.' };
        }
    }

    static async logout() {
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('current-project');
    }

    static isLoggedIn() {
        return sessionStorage.getItem('auth-token') != undefined;
    }

    static changeCurrentProject(newProject) {
        sessionStorage.setItem('current-project', newProject);
    }
}

export default AuthenticationServices;