import React, { Component } from 'react';
import UserDataService from '../Services/UserDataService';
import { withRouter } from '../withRouter';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat';

class MyStore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: {
                id: "",
                firstName: "",
                lastName: ""
            },
            streams: []
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
                }
            });
            UserDataService.getAllUserStreams(user.id).then(response => {
                this.setState({
                    streams: response.data
                });
                console.log(response.data);
            }).catch(e => {
                console.log(e);
            });
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="text-start">
                    <h1>Welcome, {this.state.currentUser.firstName}!</h1>
                    <p>{this.state.currentUser.id}</p>
                    <br/>
                    <br/>
                    <br/>
                    <h2>Scheduled streams:</h2>
                    <div className="row">
                        {
                            this.state.streams.map(
                                stream => (
                                    UpcomingStreams(stream)
                                )
                            )
                        }
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <h2>List Of Products:</h2>
                    
                </div>
            </div>
        );
    }
}

export default withRouter(MyStore);

function UpcomingStreams(stream) {
    if (stream.status === "PENDING") {
        return (
            <Card className="mx-3" style={{ width: '18rem' }}>
                <Card.Img variant="top" src="" />
                <Card.Body>
                    <Card.Title>{stream.title}</Card.Title>
                    <Card.Text>
                        {dateFormat(stream.schedule, "dd-mm-yyyy")}
                        <br/>
                        {dateFormat(stream.schedule, "HH:MM")}
                    </Card.Text>
                    <Link to={"/streams/" + stream.id}>
                        <Button variant="primary">Edit</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    } else {
        return null;
    }
}