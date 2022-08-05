import React, { Component } from "react";
import LoginDataService from "../Services/LoginDataService";
import { withRouter } from '../withRouter';

class Home extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            username: "",
            password: ""
        };

    }
    
    componentDidMount() {
        if (sessionStorage.getItem('user') !== null) {
            this.props.navigate('/mystore');
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    submit() {
        var data = {
            username: this.state.username,
            password: this.state.password
        };
        LoginDataService.loginCheck(data).then(response => {
             if (response.status === 200) {
                sessionStorage.setItem('user', JSON.stringify(response.data))
                this.props.navigate('/mystore');
             } else {
                this.props.navigate('/home');
             }
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }



    render() {
        return (
            <div className="container-fluid">
                <div className="text-start">
                    <h1>Welcome, Customer!</h1>
                    <br />
                    <div className="form-group my-2">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            required
                            value={this.state.username}
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
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            name="password"
                        />
                    </div>
                    <button onClick={this.submit} className="btn btn-success">
                        Sign in
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);
