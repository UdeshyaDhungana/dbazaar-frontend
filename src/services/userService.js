import jwtDecode from 'jwt-decode';
import http, { baseUrl } from './httpService';

const usersApi = baseUrl + '/auth/users/';
const loginApi = baseUrl + '/auth/jwt/create'

export async function register(user){
    return http.post(usersApi, user);
}

export async function login(user){
    return http.post(loginApi, user);
}

export function logout(){
    localStorage.removeItem('accessToken');
}

export async function setJwt({ access }){
    localStorage.setItem('accessToken', access);
}

export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem('accessToken');
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}