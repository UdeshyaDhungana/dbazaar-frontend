import http, { baseUrl } from "./httpService";

const productUrl = baseUrl + '/store/products/'

function singleProductUrl(productId) {
    return `${productUrl}${productId}/`
}

function productVisibilityUrl(productId){
    return `${singleProductUrl(productId)}visibility/`
}

function getCommentOnProductUrl(id, commentId) {
    return productUrl + `${id}/comments/${commentId?commentId+'/':''}`;
}

function getBidOnProductUrl(id, bidId) {
    return productUrl + `${id}/bids/${bidId?bidId+'/':''}`;
}

/* ========== Synchronous ========== */
export async function getProducts() {
    return http.get(productUrl);
}

export function getImageUrl(source) {
    return baseUrl + source;
}

/* ========== Asynchronous ========== */
export async function getSingleProuct(id) {
    return http.get(singleProductUrl(id));
}

export async function addProduct(product) {
    return http.post(productUrl, product, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export async function deleteProduct(id) {
    return http.delete(singleProductUrl(id));
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

export async function deleteCommentOfProduct(productId, commentId){
    return http.delete(getCommentOnProductUrl(productId, commentId));
}

/* Bids */
export async function getProductBids(id) {
    return http.get(getBidOnProductUrl(id));
}

export async function postBidOnProduct(id, bid) {
    return http.post(getBidOnProductUrl(id), bid);
}

export async function deleteBidOfProduct(productId, bidId){
    return http.delete(getBidOnProductUrl(productId, bidId));
}

export async function approveBidOfProduct(productId, bidId){
    return http.put(getBidOnProductUrl(productId, bidId), {
        'approved': true,
    })
}

export async function toggleVisibility(productId, visibility) {
    return http.put(productVisibilityUrl(productId), {}, {
        params: {
            visible: visibility
        }
    })
}