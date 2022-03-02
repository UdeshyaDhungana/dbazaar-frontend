import jwtDecode from 'jwt-decode';
import http, { baseUrl } from './httpService';

const usersApi = baseUrl + '/auth/users/';
const createJwtApi = baseUrl + '/auth/jwt/create';
const refreshJwtApi = baseUrl + '/auth/jwt/refresh';
const myDetailsApi = baseUrl + '/auth/users/me';

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

export async function getMyDetails() {
    return http.get(myDetailsApi, {
        headers: {
            'Authorization': `JWT ${getAccessTokenLocal()}`
        }
    });
}

/* Synchronous */

export function saveAccessToken(accessToken) {
    accessToken && localStorage.setItem('accessToken', accessToken);
}

export function saveRefreshToken(refreshToken) {
    refreshToken && localStorage.setItem('refreshToken', refreshToken);
}

export function saveToken({ access, refresh }){
    saveAccessToken(access);
    saveRefreshToken(refresh);
}

export function removeAccessToken(){
    localStorage.removeItem('accessToken');
}

export function removeRefreshToken(){
    localStorage.removeItem('refreshToken');
}

export function removeTokens() {
    removeAccessToken();
    removeRefreshToken();
}

export function getAccessTokenLocal(){
    return localStorage.getItem('accessToken');
}

export function getRefreshTokenLocal(){
    return localStorage.getItem('refreshToken');
}

export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem('accessToken');
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}