import axios from "axios";

const BUYER_API_BASE_URL = "http://localhost:8080/api/buyer"

class BuyerDataService {
    getAllStreams() {
        return axios.get(BUYER_API_BASE_URL + "/streams");
    }

    getAllChannels() {
        return axios.get(BUYER_API_BASE_URL + "/channels");
    }

    selectStream(streamId) {
        return axios.get(BUYER_API_BASE_URL + "/" + streamId);
    }

    addToCart(buyerId, prodId, qty) {
        return axios.get(BUYER_API_BASE_URL + "/" + buyerId + "/" + prodId + "/" + qty);
    }

    viewCart(buyerId) {
        return axios.get(BUYER_API_BASE_URL + "/" + buyerId);
    }

    editCartQty(orderProdId, qty) {
        return axios.get(BUYER_API_BASE_URL + "/" + orderProdId + "/" + qty);
    }

    removeCartItem(orderProdId) {
        return axios.get(BUYER_API_BASE_URL + "/" + orderProdId);
    }

    emptyCart(buyerId) {
        return axios.get(BUYER_API_BASE_URL + "/" + buyerId);
    }

}

export default new BuyerDataService();