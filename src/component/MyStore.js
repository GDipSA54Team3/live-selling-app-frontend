import dateFormat from 'dateformat';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import UserDataService from '../Services/UserDataService';
import { withRouter } from './withRouter';

class MyStore extends Component {
    constructor(props) {
        super(props);
        this.deleteStream = this.deleteStream.bind(this);
        this.editStream = this.editStream.bind(this);

        this.state = {
            currentUser: {
                id: "",
                firstName: "",
                lastName: ""
            },
            streams: [],
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

    deleteStream(e) {
        UserDataService.deleteStream(e).then(response => {
            if (response.status === 200) {
                // this.props.navigate('/mystore');
                this.setState({
                    streams: this.state.streams.filter(stream => stream.id !== e)
                });
            }
        }).catch(e => { console.log(e) });
    }

    editStream(e) {
        this.props.navigate('/updatestream/' + e);
        // this.props.navigate(`/updatestream/${e}`);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="text-start">
                    <h1>Welcome, {this.state.currentUser.firstName}!</h1>
                    <p>{this.state.currentUser.id}</p>
                    <br />
                    <br />
                    <br />
                    <h2>Scheduled streams: <button button onClick={() => this.props.navigate('/newstream')} className="btn btn-success">Add Stream</button></h2>
                    <div className="row">
                        {
                            this.state.streams.map(
                                stream => (
                                    <Card className="mx-3" style={{ width: '18rem' }}>
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
                    <h2>List Of Products:</h2>

                </div>
            </div>
        );
    }
}

export default withRouter(MyStore);
