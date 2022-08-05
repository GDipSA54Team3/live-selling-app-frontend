import React,{ Component } from "react"; 
import ProductDataService from "../Services/ProductDataService"
import { withRouter } from "./withRouter";

class ProductList extends Component{
    constructor(props){
        super(props);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveProduct = this.setActiveProduct.bind(this);
        this.removeAllProducts = this.removeAllProducts.bind(this);

        this.state = {
            products : [],
            currentProduct: null,
            currentIndex: -1, 
        }
    }
    componentDidMount(){
        this.retrieveProducts();
    }

    retrieveProducts(){
        ProductDataService.getProducts()
        .then(response => {
            this.setState({
                products: response.data
            });
            console.log(response.data);
        })
     .catch( e => {
        console.log(e);
     });
    }
    
    refreshList(){
        this.retrieveProducts();
        this.setState({
            currentProduct: null,
            currentIndex: -1
        });
    }

    setActiveProduct(Product, index){
        this.setState({
            currentProduct:Product,
            currentIndex:index,
        });
    }

    removeAllProducts(){
        ProductDataService.deleteAll()
        .then(response => {
            console.log(response.data);
            this.refreshList();
        });
    }

    render() {
        let tb_data = this.state.list.map((product)=>{
            return(
                <tr key ={product.Name}>
                    <td>{product.Name}</td>
                    <td>{product.Category}</td>
                    <td>{product.Description}</td>
                    <td>{product.Price}</td>
                    <td>{product.Quantity}</td>
                    <td>
                        <button className="btn btn-dark">Update</button>
                    </td>
                    <td>
                        <button className="btn btn-dark">Remove</button>
                    </td>
                </tr>
            )
        })
    return(
        <div className = "container">
            <table className ="table table-striped">
                <thead class="table-dark">
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tb_data}
                </tbody>
            </table>
        </div>
 
 )
}
}
export default withRouter(ProductList);


