import dateFormat from 'dateformat';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import UserDataService from '../Services/UserDataService';
import ProductDataService from '../Services/ProductDataService';
import { withRouter } from './withRouter';

class MyStore extends Component {
    constructor(props) {
        super(props);
        this.deleteStream = this.deleteStream.bind(this);
        this.editStream = this.editStream.bind(this);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveProduct = this.setActiveProduct.bind(this);

        this.state = {
            currentUser: {
                id: "",
                firstName: "",
                lastName: ""
            },
            streams: [],
            products: [],
            currentProduct: {
                id: "",
                name: "",
                category: "",
                description: "",
                price: 0.00,
                quantity: 0,
            },
        }

    }

    componentDidMount() {
        if (sessionStorage.getItem('user') === null) {
            this.props.navigate('/home');
        } else {
            const user = JSON.parse(sessionStorage.getItem('user'));

            this.setState({
                currentUser: {
                    ...this.state.currentUser,
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName
                },

            })



            UserDataService.getAllUserStreamsPending(user.id).then(response => {
                this.setState({
                    streams: response.data
                });
                console.log(response.data);
            }).catch(e => {
                console.log(e);
            });

            ProductDataService.getProducts().then(response => {
                this.setState({
                    products: response.data
                });
                console.log(response.data);
            }).catch(e => {
                console.log(e);
            });
        }
    }
    retrieveProducts() {
        ProductDataService.getProducts()
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
    refreshList() {
        this.retrieveProducts();
        this.setState({
            currentProduct: null,
            currentIndex: -1
        });
    }

    setActiveProduct(Product, index) {
        this.setState({
            currentProduct: Product,
            currentIndex: index,
        });
    }

    deleteStream(e) {
        UserDataService.deleteStream(e).then(response => {
            if (response.status === 200) {
                this.setState({
                    streams: this.state.streams.filter(stream => stream.id !== e)
                });
            }
        }).catch(e => { console.log(e) });
    }

    editStream(e) {
        this.props.navigate('/updatestream/' + e);
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="text-start">
                    <h1>Welcome, {this.state.currentUser.firstName}!</h1>
                    <br />
                    <br />
                    <br />
                    <h2>Scheduled streams: <button button onClick={() => this.props.navigate('/newstream')} className="btn btn-success">Add Stream</button></h2>
                    <div className="row">
                        {
                            this.state.streams.map(
                                (stream, index) => (
                                    <Card className="mx-3" style={{ width: '18rem' }} key={index}>
                                        <Card.Img variant="top" src="" />
                                        <Card.Body>
                                            <Card.Title>{stream.title}</Card.Title>
                                            <Card.Text>
                                                {dateFormat(stream.schedule, "dd-mm-yyyy")}
                                                <br />
                                                {dateFormat(stream.schedule, "HH:MM")}
                                            </Card.Text>
                                            <Stack direction="horizontal" gap={2}>
                                                <Button variant="primary" onClick={() => this.editStream(stream.id)}>Edit</Button>
                                                <Button variant="primary" onClick={() => this.deleteStream(stream.id)}>Delete</Button>
                                            </Stack>
                                        </Card.Body>
                                    </Card>
                                )
                            )
                        }
                    </div>
                    <br />
                    <br />
                    <br />
                    <h2>List Of Products: <button button onClick={() => this.props.navigate('/addproduct')} className="btn btn-success">Add Product</button></h2>
                    <div className="container">
                        <table className="table table-striped">
                            <thead className="table-dark">
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
                                {this.state.products.map((item, i) => (
                                    <tr key={i}>
                                        <td> {String(item.name)}</td>
                                        <td>{String(item.category)}</td>
                                        <td>{String(item.description)}</td>
                                        <td>{Number(item.price)}</td>
                                        <td>{Number(item.quantity)}</td>
                                        <td>
                                            <button className="btn btn-dark">Update</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-dark">Remove</button>
                                        </td>
                                    </tr>
                                
                                ))
                                }
                                 </tbody>
                          
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MyStore);
