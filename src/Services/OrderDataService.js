import axios from "axios";

const ORDER_API_BASE_URL = "http://localhost:8080/api/orders";

class OrderDataService {

    getChannelOrdersPendingByUserId(id) {
        return axios.get(ORDER_API_BASE_URL + "/channelordersuserpending/" + id);
    }

    getChannelOrdersConfirmedByUserId(id) {
        return axios.get(ORDER_API_BASE_URL + "/channelordersuserconfirmed/" + id);
    }

    getProductsInOrder(id) {
        return axios.get(ORDER_API_BASE_URL + "/products/" + id);
    }

    getOrderById(id) {
        return axios.get(ORDER_API_BASE_URL + "/getorder/" + id);
    }

    updateOrderStatus(orderid, status) {
        return axios.put(ORDER_API_BASE_URL + "/updateorderstatus/" + orderid + "/" + status);
    }
}

export default new OrderDataService();