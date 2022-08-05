import React,{ Component } from "react"; 
import ProductDataService from "../Services/ProductDataService";

export default class AddProduct extends Component{
    constructor(props){
        super(props);
        this.onChangeProductId = this.onChangeProductId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);  
        this.onChangeQuantity = this.onChangeQuantity.bind(this);  
    }

    onChangeProductId(p){
        this.setState({
            productId:p.target.value
        });
    }

    onChangeName(p){
        this.setState({
            name:p.target.value
        });
    }

    
    onChangeCategory(p){
        this.setState({
            category:p.target.value
        });
    }

    onChangeDescription(p){
        this.setState({
            description:p.target.value
        });
    }

    onChangePrice(p){
        this.setState({
            price:p.target.value
        });
    }
    onChangeQuantity(p){
        this.setState({
            quantity:p.target.value
        });
    }

    saveProduct(){
        var data = {
            productId: this.state.productId,
            name: this.state.name,
            category: this.state.category,
            description: this.state.description,
            price: this.state.price,
            quantity:this.state.quantity
        };

    ProductDataService.addProduct(data)
    .then(response => {
        this.setState({
            id:response.data.id,
            productId:response.data.productId,
            name: response.data.name,
            category: response.data.category,
            description: response.data.description,
            price:response.data.price,
            quantity:response.data.quantity
        });
        console.log(response.data);
     })
     .catch(e => {
        console.log(p);
     });
    }

    newProduct(){
        this.setState({
            id:null,
            productId: "",
            name:"",
            category:"",
            description: "",
            price:0.00,
            quantity: 0
        });
    }
   
    render() {
    return(
        <> <div>
            <h4>What do you want to add?</h4>
            </div>
         <div class="col-50">

         </div>
         <div class="col-75">

         </div>
         </>
         
         
           
        )
    }
}