import React,{Component} from 'react';
import ProductDataService from '../Services/ProductDataService';

export default class EditProduct extends Component{
    constructor(props){
        super(props);
        this.onChangeProductId = this.onChangeProductId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);  
        this.onChangeQuantity = this.onChangeQuantity.bind(this); 
        this.getProduct = this.getProduct.bind(this);
        this.updateProduct = this. updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = {
            currentProduct:{
                id: null,
                productId: "",
                name: "",
                category: "",
                description: "",
                price: 0.00,
                quantity: 0,
            },
            message: ""
        };
    }
    componentDidMount(){
        this.getProduct(this.props.match.params.id);
    }

    onChangeProductId(p){
        const productId = p.target.value;

        this.setState(function (prevState){
            return{
                currentProduct:{
                    ...prevState.currentProduct,
                    productId:productId
                }
            };
        });
    }
    onChangeName(p){
        const name = p.target.value;

        this.setState(function (prevState){
            return{
                currentProduct:{
                    ...prevState.currentProduct,
                    name:name
                }
            };
        });
    }

    onChangeCategory(p){
        const category = p.target.value;

        this.setState(function (prevState){
            return{
                currentProduct:{
                    ...prevState.currentProduct,
                    category:category
                }
            };
        });
    }

    onChangeDescription(p){
        const description = p.target.value;

        this.setState(function (prevState){
            return{
                currentProduct:{
                    ...prevState.currentProduct,
                    description:description
                }
            };
        });
    }
    onChangePrice(p){
        const price = p.target.value;

        this.setState(function (prevState){
            return{
                currentProduct:{
                    ...prevState.currentProduct,
                    price:price
                }
            };
        });
    }
    onChangeQuantity(p){
        const quantity = p.target.value;

        this.setState(function (prevState){
            return{
                currentProduct:{
                    ...prevState.currentProduct,
                    quantity:quantity
                }
            };
        });
    }
    getProduct(id){
        ProductDataService.getProductById(id)
        .then(response => {
            this.setState({
                currentProduct:response.data
            });
            console.log(response.data)
        })
        .catch(e =>{
            console.log(e)
        });
    }
    updateProduct(){
        ProductDataService.updateProduct(
            this.state.currentProduct.id,
            this.state.currentProduct
        )
        .then(response => {
            console.log(response.data);
            this.setState({
                message:"The product was updated successfully!"
            });
        })
        .catch(e =>{
            console.log(e)
        });
    }
    deleteProduct(){
        ProductDataService.deleteProduct(
            this.state.currentProduct.id)
        .then(response => {
            console.log(response.data);
            this.props.history.push('/products')
        })
        .catch(e =>{
            console.log(e);
        });
    }

    render() {
        return(
            <> <div>
                (currentProduct ? (
                    <h4>What do you want to add?</h4>
                </div>
             <div class="col-75">
             <div className="form-group">
                <label htmlFor="name">
                   Enter: Name
                </label>
                <input
                    type="text"
                    className = "form-control"
                    id="name"
                    value ={currentProduct.name}
                    onChange={this.onChangeName}
                    />
                    </div>
                    <div className="form-group">
                <label htmlFor="category">
                  Enter Category:
                </label>
                <input
                    type="text"
                    className = "form-control"
                    id="Category"
                    value ={currentProduct.category}
                    onChange={this.onChangeCategory}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="price">
                 Enter Price:
                </label>
                    <input
                    type="text"
                    className = "form-control"
                    id="Price"
                    value ={currentProduct.price}
                    onChange={this.onChangePrice}
                    />
                    <div className="form-group">
                    <label htmlFor="price">
                  Enter Product Description:
                </label>
                    <input
                    type="text"
                    className = "form-control"
                    id="Price"
                    value ={currentProduct.description}
                    onChange={this.onChangeDescription}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="price">
                  Enter Quantity:
                </label>
                    <input
                    type="int"
                    className = "form-control"
                    id="Quantity"
                    value ={currentProduct.quantity}
                    onChange={this.onChangeQuantity}
                    />
                    </div>
                </div>
                )
                )
                <button onClick={this.updateProduct} className="btn-btn-dark">
                    Add It!
                </button>
             </div>
             </>
             )  
        }
    }

