import React, { Component } from 'react';
import UserDataService from '../Services/UserDataService';
import { withRouter } from './withRouter';


class RegisterUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordVeri = this.onChangePasswordVeri.bind(this);
        this.onChangeChannelName = this.onChangeChannelName.bind(this);
        this.submit = this.submit.bind(this)

        this.state = {
            newUser: {
                firstName: "",
                lastName: "",
                address: "",
                username: "",
                password: "",
                passwordVeri: "",
                isVerified: false
            },
            channelName: "",
        }
    }

    onChangeFirstName(e) {
        this.setState(function (prevState) {
            return {
                newUser: {
                    ...prevState.newUser,
                    firstName: e.target.value
                }
            }
        });
    }

    onChangeLastName(e) {
        this.setState(function (prevState) {
            return {
                newUser: {
                    ...prevState.newUser,
                    lastName: e.target.value
                }
            }
        });
    }

    onChangeAddress(e) {
        this.setState(function (prevState) {
            return {
                newUser: {
                    ...prevState.newUser,
                    address: e.target.value
                }
            }
        });
    }

    onChangeUsername(e) {
        this.setState(function (prevState) {
            return {
                newUser: {
                    ...prevState.newUser,
                    username: e.target.value
                }
            }
        });
    }

    onChangePassword(e) {
        this.setState(function (prevState) {
            return {
                newUser: {
                    ...prevState.newUser,
                    password: e.target.value
                }
            }
        });
    }

    onChangePasswordVeri(e) {
        this.setState(function (prevState) {
            return {
                newUser: {
                    ...prevState.newUser,
                    passwordVeri: e.target.value
                }
            }
        });
    }

    onChangeChannelName(e) {
        this.setState({
            channelName: e.target.value
        });
    }

    submit() {
        if (this.state.newUser.firstName !== "" && this.state.newUser.lastName !== "" &&
        this.state.newUser.address !== "" && this.state.newUser.username !== "" &&
        this.state.newUser.password !== "" && this.state.channelName !== "" &&
        this.state.newUser.passwordVeri === this.state.newUser.password) {
            UserDataService.addNewUser(this.state.channelName, this.state.newUser).then(response => {
                if (response.status === 201) {
                    this.props.navigate('/home');
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
                    <h1>Register New User</h1>
                    <br />
                    <div className="form-group my-2">
                        <label htmlFor="firstName">First name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            required
                            value={this.state.newUser.firstName}
                            onChange={this.onChangeFirstName}
                            name="firstName"
                        />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="lastName">Last name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            required
                            value={this.state.newUser.lastName}
                            onChange={this.onChangeLastName}
                            name="lastName"
                        />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            required
                            value={this.state.newUser.address}
                            onChange={this.onChangeAddress}
                            name="address"
                        />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="channelName">Channel name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="channelName"
                            required
                            value={this.state.channelName}
                            onChange={this.onChangeChannelName}
                            name="channelName"
                        />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            required
                            value={this.state.newUser.username}
                            onChange={this.onChangeUsername}
                            name="username"
                        />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            value={this.state.newUser.password}
                            onChange={this.onChangePassword}
                            name="password"
                        />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="passwordveri">
                            Confirm Password: {(this.state.newUser.passwordVeri !== this.state.newUser.password) ? 
                            <span style={{color: "#ff0000"}}>Password does not match</span> : <span style={{color: "#009933"}}>Password matches</span>}
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordveri"
                            required
                            value={this.state.newUser.passwordVeri}
                            onChange={this.onChangePasswordVeri}
                            name="passwordveri"
                        />
                    </div>
                    <button onClick={this.submit} className="btn btn-dark my-2">
                        Submit
                    </button>
                    <button className="btn btn-outline-dark ms-2" onClick={() => this.props.navigate(-1)}>
                        Back
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(RegisterUser);