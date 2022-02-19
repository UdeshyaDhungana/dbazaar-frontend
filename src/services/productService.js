import http, { baseUrl } from "./httpService";

const productUrl = baseUrl + '/store/products'

export async function getProducts(){
    return http.get(productUrl);
}

export function getImageUrl(source){
    return baseUrl + source
}