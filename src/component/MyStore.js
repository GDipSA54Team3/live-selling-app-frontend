import dateFormat from 'dateformat';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import OrderDataService from '../Services/OrderDataService';
import UserDataService from '../Services/UserDataService';
import { withRouter } from './withRouter';

class MyStore extends Component {
    constructor(props) {
        super(props);
        this.deleteStream = this.deleteStream.bind(this);
        this.editStream = this.editStream.bind(this);
        this.getOrderList = this.getOrderList.bind(this);
        this.updateOrderStatus = this.updateOrderStatus.bind(this);

        this.state = {
            currentUser: {
                id: "",
                firstName: "",
                lastName: ""
            },
            streams: [],
            orders: [],
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
            UserDataService.getAllUserStreamsPending(user.id).then(response => {
                this.setState({
                    streams: response.data
                });
                console.log(response.data);
            }).catch(e => {
                console.log(e);
            });
            this.getOrderList(user.id);
        }
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

    getOrderList(e) {
        OrderDataService.getChannelOrdersByUserId(e).then(response => {
            this.setState({
                orders: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    updateOrderStatus(e1, e2) {
        OrderDataService.updateOrderStatus(e1, e2).then(response => {
            if (response.status === 200) {
                this.setState({
                    orders: this.state.orders.filter(order => order.id !== e1)
                });
            }
        }).catch(e => { console.log(e) });
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="text-start">
                    <h1>Welcome, {this.state.currentUser.firstName}!</h1>
                    <Stack direction="horizontal" gap={2}>
                        <button onClick={() => this.props.navigate('/productlist')} className="btn btn-outline-dark">Manage Products</button>
                        <button onClick={() => this.props.navigate('/newstream')} className="btn btn-outline-dark">Add Stream</button>
                    </Stack>
                    <br />
                    <br />
                    <br />
                    <h2>Scheduled streams: <button onClick={() => this.props.navigate('/newstream')} className="btn btn-outline-dark">Add Stream</button></h2>
                    <br />
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
                                                {dateFormat(stream.schedule, "h:MM TT")}
                                            </Card.Text>
                                            <Stack direction="horizontal" gap={2}>
                                                <Button variant="dark" onClick={() => this.editStream(stream.id)}>Edit</Button>
                                                <Button variant="dark" onClick={() => this.deleteStream(stream.id)}>Delete</Button>
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

                    <Stack direction="horizontal" gap={2}>
                        <h2>Order List:</h2>
                        <button onClick={() => this.getOrderList(this.state.currentUser.id)} className="btn btn-outline-dark">Refresh</button>
                        <button onClick={null} className="btn btn-outline-dark">Order History</button>
                    </Stack>
                    <br />
                    <table className="table table-striped table-hover" style={{ tableLayout: 'fixed', borderRadius: '8px', overflow: 'hidden' }}>
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Product</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.orders.map((order, i) => (
                                    <tr key={i}>
                                        <td className="text-truncate">{order.id}</td>
                                        <td className="text-truncate">{order.user.firstName} {order.user.lastName}</td>
                                        <td className="text-truncate">{dateFormat(order.orderDateTime, "dd-mm-yyyy h:MM TT")}</td>
                                        <td>{order.status}</td>
                                        <td><button className="btn btn-dark ms-2" onClick={() => this.props.navigate('/vieworder/' + order.id)}>View</button></td>
                                        <td>
                                            <div style={{ whiteSpace: 'nowrap' }}>
                                                <button className="btn btn-dark" onClick={() => this.updateOrderStatus(order.id, "CONFIRMED")}>Accept</button>
                                                <button className="btn btn-dark ms-2" onClick={null}>Reject</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(MyStore);
