import axios from "axios";

const PRODUCT_API_BASE_URL = "";

class ProductService{

    getProducts(){
        return axios.get(PRODUCT_API_BASE_URL);
    }

    addProduct(product){
        return axios.post(PRODUCT_API_BASE_URL,"/addtostore/" + product);
    }

    getProductById(id){
        return axios.get(PRODUCT_API_BASE_URL + "/" +id);
    }

    findByName(name){
        return axios.get(PRODUCT_API_BASE_URL + "?name=" +name);
    }

    updateProduct(id, product){
        return axios.get(PRODUCT_API_BASE_URL + "/edit/" +id, product);
    }

    deleteProduct(id){
        return axios.delete(PRODUCT_API_BASE_URL + "/"+id);
    }

    deleteAll(){
        return axios.delete(PRODUCT_API_BASE_URL);
    }
}

export default new ProductService;