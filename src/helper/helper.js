import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


/** Make API Requests */

/** To get getTokenData from Token */
export async function getTokenData(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwtDecode(token)
    return decode;
}

/** authenticate function */
export async function authenticate(username){
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

/** register user function */
export async function registerUser(credentials){
    try {
        const { data : { msg }, status } = await axios.post(`/api/register`, credentials);

        let { email } = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/registerMail', { username:email, userEmail:email, text:msg})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}


/** login function */
export async function verifyPassword({ username, password }){
    console.log(username, password);
    try {
        if(username){
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** login with google function */
export async function verifyloginwithgoogle({ username }){
    try {
        if(username){
            const { data } = await axios.post('/api/loginwithgoogle', { username })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** generate OTP */
export async function generateOTP(username){
    try {
        const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { username }});

        // send mail with the OTP
        if(status === 201){
            let text = `Your Password OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: username, text, subject : "Password OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
        const { data, status } = await axios.get('/api/verifyOTP', { params : { username, code }})
        return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}