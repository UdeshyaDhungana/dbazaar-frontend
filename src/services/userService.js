import http, { baseUrl } from './httpService';

const usersApi = baseUrl + '/auth/users/';

export async function register(user) {
    return http.post(usersApi, user);
}