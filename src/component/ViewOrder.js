import React, { Component } from 'react';
import OrderDataService from '../Services/OrderDataService';
import Stack from 'react-bootstrap/Stack';
import { withRouter } from './withRouter';

class ViewOrder extends Component {
    constructor(props) {
        super(props);
        this.retrieveOrderProducts = this.retrieveOrderProducts.bind(this);

        this.state = {
            currentUser: {
                id: "",
                firstName: "",
                lastName: ""
            },
            orderProducts: [],
            currentOrder: {
                id: "",
                customerName: ""
            }
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
                    },
                    orderId: this.props.params.orderid,
                }
            });
            this.retrieveOrderProducts(this.props.params.orderid);
            OrderDataService.getOrderById(this.props.params.orderid).then(response => {
                this.setState(function (prevState) {
                    return {
                        currentOrder: {
                            ...prevState.currentOrder,
                            id: response.data.id,
                            customerName: response.data.user.firstName + " " + response.data.user.lastName
                        }
                    }
                });
                console.log(response.data);
            }).catch(e => {
                console.log(e);
            });

        }
    }

    retrieveOrderProducts(e) {
        OrderDataService.getProductsInOrder(e)
            .then(response => {
                this.setState({
                    orderProducts: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return (
            <div className="text-start">
                <h2>List Of Ordered Products:</h2>
                <p>Order ID: {this.state.currentOrder.id}</p>
                <p>Customer: {this.state.currentOrder.customerName}</p>
                <br />
                <div className="d-flex mb-3">
                    <div>
                        <button className="btn btn-outline-dark" onClick={() => this.props.navigate(-1)}>Back</button>
                    </div>
                    <div className="ms-auto">
                        <Stack direction="horizontal" gap={2}>
                            <button onClick={null} className="btn btn-outline-dark">Accept</button>
                            <button onClick={null} className="btn btn-outline-dark">Reject</button>
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
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.orderProducts.map((item, i) => (
                                <tr key={i}>
                                    <td className="text-truncate">{item.product.name}</td>
                                    <td>{item.product.category}</td>
                                    <td className="text-truncate">{item.product.description}</td>
                                    <td>S${item.product.price.toFixed(2)}</td>
                                    <td>{item.product.quantity}</td>
                                    {/* <td>
                                        <div style={{ whiteSpace: 'nowrap' }}>
                                            <button className="btn btn-dark" onClick={() => this.updateProduct(item.id)}>Update</button>
                                            <button className="btn btn-dark ms-2" onClick={() => this.deleteProduct(item.id)}>Remove</button>
                                        </div>
                                    </td> */}
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

export default withRouter(ViewOrder);