import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { LOGIN_API } from '../config';

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
    return axios
            .post(LOGIN_API, credentials)
            .then(response => response.data.token)
            .then(token => {
                // stockage dans local storage
                window.localStorage.setItem("authToken", token);

                // entete authorization header par defaut sur les futures requetes
                setAxiosToken(token)    
            });
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer "+ token;
}

function setup() {
    // 1 check si token
    const token =  window.localStorage.getItem("authToken");
    // 2 valide ?
    if(token) {
        const {exp: expiration} = jwtDecode(token)
        if(expiration*1000 > new Date().getTime()){
            setAxiosToken(token);
        } 
    }
    // donner toekn a axios
}
function isAuthenticated() {
    // 1 check si token
    const token =  window.localStorage.getItem("authToken");
    // 2 valide ?
    if(token) {
        const {exp: expiration} = jwtDecode(token)
        if(expiration*1000 > new Date().getTime()){
    return true;
        } 
        return false;
    }
    return false;
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}