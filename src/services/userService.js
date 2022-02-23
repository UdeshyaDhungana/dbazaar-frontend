import jwtDecode from 'jwt-decode';
import http, { baseUrl } from './httpService';

const usersApi = baseUrl + '/auth/users/';
const createJwtApi = baseUrl + '/auth/jwt/create'
const refreshJwtApi = baseUrl + '/auth/jwt/refresh'

export async function register(user){
    return http.post(usersApi, user);
}

export async function createToken(user){
    return http.post(createJwtApi, user);
}

export async function refreshToken(){
    return http.post(refreshJwtApi, {
        'refresh': localStorage.getItem('refreshToken')
    })
}

export function removeToken(){
    localStorage.removeItem('accessToken');
}

export function saveToken({ access, refresh }){
    access && localStorage.setItem('accessToken', access);
    refresh && localStorage.setItem('refreshToken', refresh);
}

export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem('accessToken');
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}