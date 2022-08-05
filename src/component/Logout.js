import React, { Component } from 'react';
import { withRouter } from '../withRouter';

class Logout extends Component {

    
    componentDidMount() {
       sessionStorage.clear();
       this.props.navigate('/home');
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