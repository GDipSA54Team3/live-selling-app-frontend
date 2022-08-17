import axios from "axios";

const LOGIN_API_BASE_URL = "https://live-stream-team3.azurewebsites.net/api"

class LoginDataService {
    loginCheck(LoginBag) {
        return axios.post(LOGIN_API_BASE_URL+"/login", LoginBag);
    }

}

export default new LoginDataService();