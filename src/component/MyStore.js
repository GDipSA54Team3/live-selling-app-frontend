import React, { Component } from 'react';
import LoginDataService from '../Services/LoginDataService';

class MyStore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: ""
        }
        
    }
    
    componentDidMount() {
        LoginDataService.getLoggedInUser().then(response => {
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
          });
    } 

    render() {
        return (
            <div>
                <h2>This is you store</h2>
                {this.state.firstName}
            </div>
        );
    }
}

export default MyStore;