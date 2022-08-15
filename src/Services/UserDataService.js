import axios from "axios";

const USER_API_BASE_URL = "https://livestream-prototype.azurewebsites.net/api/user"

class UserDataService {
    getAllUserStreamsPending(id) {
        return axios.get(USER_API_BASE_URL + "/userstreamspending/" + id);
    }

    deleteStream(id) {
        return axios.delete(USER_API_BASE_URL + "/deletestream/" + id);
    }

    addNewStream(id, body) {
        return axios.post(USER_API_BASE_URL + "/addstream/" + id, body);
    }

    selectStream(id) {
        return axios.get(USER_API_BASE_URL + "/streams/" + id);
    }

    editStream(id, body) {
        return axios.put(USER_API_BASE_URL + "/editstream/" + id, body);
    }

    addNewUser(channelName, username, password, address, body) {
        return axios.post(USER_API_BASE_URL + "/register/" + channelName + "/" + username + "/" + password + "/" + address, body);
    }

}

export default new UserDataService();