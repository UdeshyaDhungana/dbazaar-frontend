import http, { baseUrl } from "./httpService";

const categoryApi = baseUrl + '/store/collections'

export async function getCategories(){
    return http.get(categoryApi);
}