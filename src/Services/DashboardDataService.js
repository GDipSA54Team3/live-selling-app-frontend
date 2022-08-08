import axios from "axios";

const RATING_API_BASE_URL = "http://localhost:8080/api/rating/userrating/";
const PREDICTION_API_BASE_URL = "http://127.0.0.1:5000/result";

class DashboardDataService {  
    getUserAverageRating(userId){
        return axios.get(RATING_API_BASE_URL+userId);      
    }
    async getPrediction(formData){ 

        const response = await axios({
            method: 'post',
            url: PREDICTION_API_BASE_URL,
            data: formData,
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            },
        });        
        return response;
    }
}
export default new DashboardDataService();