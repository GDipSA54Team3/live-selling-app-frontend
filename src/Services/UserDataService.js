import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/user"

class UserDataService {
    getAllUserStreams(id) {
        return axios.get(USER_API_BASE_URL + "/userstreams/" + id)
    }

    deleteStream(id) {
        return axios.delete(USER_API_BASE_URL + "/deletestream/" + id)
    }

}

export default new UserDataService();