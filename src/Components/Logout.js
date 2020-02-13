import React, { Component } from 'react';
import Login from './Login';

class Logout extends Component {

    constructor(){
        super();
        this.state = {
            token : '',
        };
    }
    componentDidMount() {
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }
    render() {
        return (
            <Login></Login>
        );
    }
}
export default Logout
