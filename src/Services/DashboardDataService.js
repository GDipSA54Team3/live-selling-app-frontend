import axios from "axios";

const Dashboard_API_BASE_URL = "";

class DashboardDataService {
  getChart() {
    return axios.get(Dashboard_API_BASE_URL);
  } 
}
export default new DashboardDataService();