import http, { baseUrl } from "./httpService";

const productUrl = baseUrl + '/store/products/'

export async function getProducts(){
    return http.get(productUrl);
}

export function getImageUrl(source){
    return baseUrl + source;
}

export async function getSingleProuct(id){
    return http.get(productUrl + `${id}`);
}

export async function addProduct(product){
    return http.post(productUrl, product, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}