import http, { baseUrl } from "./httpService";

const productUrl = baseUrl + '/store/products/'

function getCommentOnProductUrl(id) {
    return productUrl + `${id}/comments/`
}

/* Synchronous */
export async function getProducts() {
    return http.get(productUrl);
}

export function getImageUrl(source) {
    return baseUrl + source;
}

/* Asynchronous */
export async function getSingleProuct(id) {
    return http.get(productUrl + `${id}`);
}

export async function addProduct(product) {
    return http.post(productUrl, product, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

/* Comments */
export async function getProductComments(id) {
    return http.get(getCommentOnProductUrl(id));
}

export async function postCommentOnProduct(id, description) {
    return http.post(getCommentOnProductUrl(id), {
        description: description
    });
}