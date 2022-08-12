import React, { Component } from "react";
import ProductDataService from "../Services/ProductDataService"
import { withRouter } from "./withRouter";
import {Card,InputGroup,FormControl, Button} from "react-bootstrap";
import { faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
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
            currentPage: 1,
            productsPerPage: 5
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

    changePage = event =>{
        this.setState({
            [event.target.name] : parseInt(event.target.value),
        });
    };

    prevPage = () => {
        if (this.state.currentPage > 1){
            this.setState({
                currentPage: this.state.currentPage -1,
            });
        }
    };
    nextPage = () => {
        if (this.state.currentPage < 10){
            this.setState({
                currentPage: this.state.currentPage + 1,
            })
        }
    };

    render() {
        const {products, currentPage, productsPerPage} = this.state;
        const lastIndex = currentPage * productsPerPage;
        const firstIndex = lastIndex - productsPerPage; 
        const currentProducts = products.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(products.length / productsPerPage);
        const pageNumCss = {
            width:"45px",
            border:"1px solid black",
            color:"black",
            textAlign:"center",
            fontWeight: "bold"
        };

        return (
            <div className="text-start">
                <h2>List Of Products: </h2>
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
                        {products.length === 0 ?
                        <tr align = "center">
                <td colSpan="6">No Products Available</td>
             </tr>:
                currentProducts.map((item, i) => (
                <tr key={i}>
                <td> {item.name}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                    <button className="btn btn-dark" onClick={() => this.updateProduct(item.id)}>Update</button>
                    <button className="btn btn-dark ms-2" onClick={() => this.deleteProduct(item.id)}>Remove</button>
                </td>
            </tr>
        ))
        }
            </tbody>
            </table>

              {products.length > 0? (
                    <Card.Footer>
                    <div style={{"float": "left"}}>
                        Showing Page {currentPage} of {totalPages}
                    </div>
                    <div style={{ float: "right" }}>
                    <InputGroup size="sm">
                            <Button type ="button" variant="outline-dark" disabled={currentPage === 1? true: false}
                                onClick={this.prevPage}>
                                <FontAwesomeIcon icon ={faStepBackward} /> Prev
                            </Button>
                        <FormControl style={pageNumCss} name="currentPage" value={currentPage}
                            onChange={this.changePage}/>
                            <Button type ="button" variant="outline-dark" disabled={currentPage === totalPages? true: false}
                            onClick={this.nextPage}>
                            <FontAwesomeIcon icon ={faStepForward} /> Next
                            </Button>
                    </InputGroup>
                    </div>
                </Card.Footer>) : null}          
             </div>

            );
         }
    }
        export default withRouter(ProductList);


