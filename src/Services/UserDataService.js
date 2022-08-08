import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/user"

class UserDataService {
    getAllUserStreams(id) {
        return axios.get(USER_API_BASE_URL + "/userstreams/" + id)
    }

    deleteStream(id) {
        return axios.delete(USER_API_BASE_URL + "/deletestream/" + id)
    }

    addNewStream(id, body) {
        return axios.post(USER_API_BASE_URL + "/addstream/" + id, body)
    }

    selectStream(id) {
        return axios.get(USER_API_BASE_URL + "/streams/" + id)
    }

    editStream(id, body) {
        return axios.put(USER_API_BASE_URL + "/editstream/" + id, body)
    }

}

export default new UserDataService();