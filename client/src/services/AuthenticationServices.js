import axios from 'axios';

const url = '/api/authentication';

class AuthenticationServices {
    static async login(email, password) {
        try {
            let res = await axios.post(`${url}/login`, {
                email: email,
                password: password,
            });
            sessionStorage.setItem('auth-token', res.data);
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
}

export default AuthenticationServices;