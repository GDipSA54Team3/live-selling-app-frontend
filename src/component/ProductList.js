import React, { Component } from "react";
import ProductDataService from "../Services/ProductDataService"
import { withRouter } from "./withRouter";
import Stack from 'react-bootstrap/Stack';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = {
            currentUser: {
                id: "",
                firstName: "",
                lastName: ""
            },
            products: [],
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
            this.retrieveProducts(user.id);
        }
    }

    retrieveProducts(e) {
        ProductDataService.getProductsByUserId(e)
            .then(response => {
                this.setState({
                    products: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateProduct(p) {
        this.props.navigate('/updateproduct/' + p);
    }

    deleteProduct(e) {
        ProductDataService.deleteProduct(e).then(response => {
            if (response.status === 200) {
                this.setState({
                    products: this.state.products.filter(product => product.id !== e)
                });
            }
        }).catch(e => { console.log(e) });
    }


    render() {

        return (
            <div className="text-start">
                <h2>List Of Products:</h2>
                <br />
                <div className="d-flex mb-3">
                    <div>
                        <button className="btn btn-outline-dark" onClick={() => this.props.navigate(-1)}>Back</button>
                    </div>
                    <div className="ms-auto">
                        <Stack direction="horizontal" gap={2}>
                            <button onClick={() => this.props.navigate('/addproduct')} className="btn btn-outline-dark">Add Product</button>
                            <button onClick={() => this.retrieveProducts(this.state.currentUser.id)} className="btn btn-outline-dark">Refresh</button>
                        </Stack>
                    </div>
                </div>

                <table className="table table-striped" style={{ tableLayout: 'fixed', borderRadius: '8px', overflow: 'hidden' }}>
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map((item, i) => (
                                <tr key={i}>
                                    <td className="text-truncate">{item.name}</td>
                                    <td>{item.category}</td>
                                    <td className="text-truncate">{item.description}</td>
                                    <td>S${item.price.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <div style={{ whiteSpace: 'nowrap' }}>
                                            <button className="btn btn-dark" onClick={() => this.updateProduct(item.id)}>Update</button>
                                            <button className="btn btn-dark ms-2" onClick={() => this.deleteProduct(item.id)}>Remove</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <button className="btn btn-outline-dark" onClick={() => this.props.navigate(-1)}>
                    Back
                </button>
            </div>
        );
    }
}
export default withRouter(ProductList);


