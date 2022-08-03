import React, { Component } from "react";
import BuyerDataService from "../Services/BuyerDataService";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            streams: []
        }

    }

    componentDidMount() {
        BuyerDataService.getAllStreams().then(response => {
            this.setState({ streams: response.data });
            console.log(response.data);
        })
            .catch(e => { console.log(e); });
    }



    render() {
        return (
            <div>
                <div className="container-fluid">
                    <h2 className="text-start">Ongoing Streams:</h2>
                    <br />
                    <div className="row">
                        {
                            this.state.streams.map(
                                stream => (
                                    OngoingStreams(stream)
                                )
                            )
                        }
                    </div>
                    <br />
                    <br />
                    <br />
                    <h2 className="text-start">Upcoming Streams:</h2>
                    <br />
                    <div className="row">
                        {
                            this.state.streams.map(
                                stream => (
                                    UpcomingStreams(stream)
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Home

function OngoingStreams(stream) {
    if (stream.status === "ONGOING") {
        return (
            <Card className="mx-3" style={{ width: '18rem' }}>
                <Card.Img variant="top" src="" />
                <Card.Body>
                    <Card.Title>{stream.title}</Card.Title>
                    <Card.Text>
                        {stream.schedule}
                    </Card.Text>
                    <Link to={"/streams/" + stream.id}>
                        <Button variant="danger">Watch Live!</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    } else {
        return null;
    }
}

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
                    <Button variant="primary disabled">Stay Tuned!</Button>
                </Card.Body>
            </Card>
        );
    } else {
        return null;
    }
}
