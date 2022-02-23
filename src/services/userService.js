import jwtDecode from 'jwt-decode';
import http, { baseUrl } from './httpService';

const usersApi = baseUrl + '/auth/users/';
const createJwtApi = baseUrl + '/auth/jwt/create'

export async function register(user){
    return http.post(usersApi, user);
}

export async function createToken(user){
    return http.post(createJwtApi, user);
}

export function removeToken(){
    localStorage.removeItem('accessToken');
}

export function saveToken({ access, refresh }){
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
}

export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem('accessToken');
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}