import React, { Component } from "react";
import ProductDataService from "../Services/ProductDataService";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            currentProduct: {
                name: "",
                category: "",
                description: "",
                price: "",
                quantity: ""
            },
            currentUser: {
                id: "",
                firstName: "",
                lastName: ""
            },
        }
    }

    componentDidMount() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        this.setState( function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            }
        });
    }



    onChangeName(p) {
        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    name: p.target.value
                }
            }
        });
    }


    onChangeCategory(p) {
        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    category: p.target.value
                }
            }
        });
    }


    onChangeDescription(p) {
        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    description: p.target.value
                }
            }
        });
    }


    onChangePrice(p) {
        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    price: p.target.value
                }
            }
        });
    }
    onChangeQuantity(p) {
        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    quantity: p.target.value
                }
            }
        });
    }

    /*  saveProduct(){
          var data = {
              name: this.state.currentProduct.name,
              category: this.state.currentProduct.category,
              description: this.state.currentProduct.description,
              price: this.state.currentProduct.price,
              quantity:this.state.currentProduct.quantity
          };
      }*/

    submit() {
         {
            ProductDataService.addProduct(this.state.currentUser.id, this.state.currentProduct).then(response => {
                if (response.status === 201) {
                    this.props.navigate('/mystore');
                }
            }).catch(e => {
                console.log(e);
            });
        }
    }


    newProduct() {
        this.setState({
            id: null,
            productId: "",
            name: "",
            category: "",
            description: "",
            price: 0.00,
            quantity: 0
        });
    }
    render() {
        return (
            <> <div>
                <h4>What do you want to add?</h4>
            </div>
                <div className="form-group" >
                    <label htmlFor="name">
                        Enter: Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={this.state.currentProduct.name}
                        onChange={this.onChangeName}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">
                        Enter Category:
                    </label>
                    <select className="form-select" aria-label="Default select example" name="product_category"
                        defaultValue={this.state.productCategory} onChange={this.handleCategoryChange} >
                        <option value="CLOTHING">Clothing</option>
                        <option value="FOOD">Food</option>
                        <option value="APPLIANCES">Home Appliances</option>
                        <option value="FURNITURES">Furnitures</option>
                        <option value="TECHNOLOGY">Electronics Devices</option>
                        <option value="BABY">Baby Items and Toys</option>
                        <option value="HEALTH">Health and Beauty</option>
                        <option value="SPORTS">Sports Items</option>
                        <option value="GROCERIES">Groceries</option>
                        <option value="OTHERS">Others</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">
                        Enter Price:
                    </label>
                    <input
                        type="int"
                        className="form-control"
                        id="Price"
                        required
                        value={this.state.currentProduct.price}
                        onChange={this.onChangePrice}
                    />
                    <div className="form-group">
                        <label htmlFor="description">
                            Enter Product Description:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="Description"
                            required
                            value={this.state.currentProduct.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">
                            Enter Quantity:
                        </label>
                        <input
                            type="int"
                            className="form-control"
                            id="Quantity"
                            value={this.state.currentProduct.quantity}
                            onChange={this.onChangeQuantity}
                        />
                    </div>
                </div>
                <br>
                </br>
                <button className="btn btn-dark" onClick={this.submit}>
                    Add It!
                </button>
            </>
        );
    }
}

export default AddProduct
