import React, { Component } from "react";
import { withRouter } from './withRouter';

class RegistrationSuccess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countdown: 5
        }
    }

    // componentDidMount() {
    //     let thisInterval = setInterval(() => {
    //         if (this.state.countdown > 0) {
    //             this.setState({
    //                 countdown: this.state.countdown - 1
    //             });
    //         } else {
    //             clearInterval(thisInterval); 
    //             this.props.navigate('/home');
    //         }
    //     }, 1000);
    // }

    render() {
        return (
            <div className="container-fluid">
                <h1>Registration Success!</h1>
                {/* <p>You will be redirected to the login page automatically after {this.state.countdown} seconds...</p> */}
                <p>
                    <button type="button" className="btn btn-link" onClick={() => this.props.navigate('/home')}>
                        Click here to return to the login page.
                    </button>
                </p>
            </div>
        );
    }
}

export default withRouter(RegistrationSuccess);