import http, { baseUrl } from "./httpService";
import { getAccessTokenLocal } from "./userService";

const myTransfersApi = baseUrl + '/store/transfers/'

function getTransferUrl(id) {
    return `${myTransfersApi}${id}/`
}


export async function getMyTransfers() {
    return http.get(myTransfersApi, {
        headers: {
            'Authorization': `JWT ${getAccessTokenLocal()}`
        }
    });
}

export async function approveTransfer(id) {
    return http.put(getTransferUrl(id), {
        'completed': 'true'
    });
}