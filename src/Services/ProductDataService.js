import axios from "axios";

const PRODUCT_API_BASE_URL = "http://127.0.0.1:8080/api/product";

class ProductService{

    getProducts(){

        return axios.get(PRODUCT_API_BASE_URL + "/products");

    }

    addProduct(product){
        return axios.post(PRODUCT_API_BASE_URL + "/addtostore" , product);
    }

    getProductById(id){
        return axios.get(PRODUCT_API_BASE_URL + "/products/" +id);
    }

    findByName(name){
        return axios.get(PRODUCT_API_BASE_URL + "/productname/" +name);
    }

    updateProduct(id, product){
        return axios.put(PRODUCT_API_BASE_URL + "/edit/" +id, product);
    }

    deleteProduct(id){
        return axios.delete(PRODUCT_API_BASE_URL + "/products/"+id);
    }
}

export default new ProductService();