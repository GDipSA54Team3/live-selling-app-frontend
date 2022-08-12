import axios from "axios";

const ORDER_API_BASE_URL = "http://localhost:8080/api/orders";

class OrderDataService {

    getChannelOrders(id) {
        return axios.get(ORDER_API_BASE_URL + "/" + id);
    }
}

export default new OrderDataService();