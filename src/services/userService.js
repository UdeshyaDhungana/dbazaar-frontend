import http, { baseUrl } from './httpService';

const usersApi = baseUrl + '/auth/users/';
const loginApi = baseUrl + '/auth/jwt/create'

export async function register(user) {
    return http.post(usersApi, user);
}

export async function login(user) {
    return http.post(loginApi, user);
}