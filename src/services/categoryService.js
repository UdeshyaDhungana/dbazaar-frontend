import http, { baseUrl } from "./httpService";

const categoryUrl = baseUrl + '/store/collections'

export async function getCategories(){
    return http.get(categoryUrl);
}