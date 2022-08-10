import React, { Component } from 'react';
import UserDataService from '../Services/UserDataService';
import { withRouter } from './withRouter';

class NewStream extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeSchedule = this.onChangeSchedule.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            currentUser: {
                id: "",
                firstName: "",
                lastName: ""
            },
            stream: {
                title: "",
                tempSchedule: "",
            }
        };
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

    onChangeTitle(e) {
        this.setState( function (prevState) {
            return {
                stream: {
                    ...prevState.stream,
                    title: e.target.value
                }
            }
        });
    }

    onChangeSchedule(e) {
        this.setState( function (prevState) {
            return {
                stream: {
                    ...prevState.stream,
                    tempSchedule: e.target.value.toString()
                }
            }
        });
    }

    submit() {
        if (this.state.stream.tempSchedule !== "" && this.state.stream.title !== "") {
            UserDataService.addNewStream(this.state.currentUser.id, this.state.stream).then(response => {
                if (response.status === 201) {
                    this.props.navigate('/mystore');
                }
            }).catch(e => {
                console.log(e);
            });
        }

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="text-start">
                    <h2>Add New Stream</h2>
                    <br/>
                    <div className="mb-3">
                        <label htmlFor="Title">Title:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={this.state.stream.title}
                            onChange={this.onChangeTitle}
                            name="title"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="schedule">Schedule:</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="tempSchedule"
                            required
                            value={this.state.stream.tempSchedule}
                            onChange={this.onChangeSchedule}
                            name="tempSchedule"
                        />
                    </div>
                    <button onClick={this.submit} className="btn btn-success">
                        Add Stream
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(NewStream);