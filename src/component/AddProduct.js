import React, { Component } from "react";
import ProductDataService from "../Services/ProductDataService";
import NavBar from "./NavBar";
import { withRouter } from './withRouter';

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
                category: "CLOTHING",
                description: "",
                price: 0,
                quantity: 0
            },
            currentUser: {
                id: "",
                firstName: "",
                lastName: ""
            },
            errorMsg: ""
        }
    }

    componentDidMount() {
        if (sessionStorage.getItem('user') === null) {
            this.props.navigate('/home');
        } else {
            const user = JSON.parse(sessionStorage.getItem('user'));
            this.setState(function (prevState) {
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

    submit() {
        if (this.state.currentProduct.name !== "" && this.state.currentProduct.description !== "" &&
            this.state.currentProduct.price !== 0) {
            ProductDataService.addToStore(this.state.currentUser.id, this.state.currentProduct).then(response => {
                if (response.status === 201) {
                    this.props.navigate('/productlist');
                }
            }).catch(e => {
                console.log(e);
            });
        } else {
            this.setState({
                errorMsg: "*Product name & description cannot be empty \n*Product price cannot be S$0"
            });
        }
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container mt-3">
                    <div className="text-start">
                        <h2>What do you want to add?</h2>
                        {this.state.errorMsg === null ? <br /> : <p style={{ color: "#ff0000", whiteSpace: "pre-line" }}>{this.state.errorMsg}</p>}
                        <div className="form-group mb-3" >
                            <label htmlFor="name">
                                Enter Name:
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
                        <div className="form-group mb-3">
                            <label htmlFor="category">
                                Enter Category:
                            </label>
                            <select className="form-select" aria-label="Default select example" name="product_category"
                                value={this.state.currentProduct.category} onChange={this.onChangeCategory} >
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
                        <div className="form-group mb-3">
                            <label htmlFor="price">
                                Enter Price:
                            </label>
                            <div className="input-group">
                                <span className="input-group-text col-1">S$</span>
                                <input
                                    type="number"
                                    step=".01"
                                    className="form-control"
                                    id="Price"
                                    required
                                    value={this.state.currentProduct.price}
                                    onChange={this.onChangePrice}
                                />
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">
                                Enter Product Description:
                            </label>
                            <textarea
                                rows="3"
                                className="form-control"
                                id="Description"
                                required
                                value={this.state.currentProduct.description}
                                onChange={this.onChangeDescription}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="quantity">
                                Enter Quantity:
                            </label>
                            <input
                                type="number"
                                max="100"
                                className="form-control"
                                id="Quantity"
                                value={this.state.currentProduct.quantity}
                                onChange={this.onChangeQuantity}
                            />
                        </div>
                        <button className="btn btn-dark" onClick={this.submit}>
                            Add It!
                        </button>
                        <button className="btn btn-outline-dark ms-2" onClick={() => this.props.navigate(-1)}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddProduct)
