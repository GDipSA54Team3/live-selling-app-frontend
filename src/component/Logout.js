import React, { Component } from 'react';
import LoginDataService from '../Services/LoginDataService';
import { withRouter } from '../withRouter';

class Logout extends Component {

    
    componentDidMount() {
        LoginDataService.logoutUser().then(this.props.navigate('/home'));
    }

    render() {
        return (
            <div>
                Logging out
            </div>
        );
    }
}

export default withRouter(Logout);