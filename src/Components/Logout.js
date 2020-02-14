import React, { Component } from 'react';
import Login from './Login';

class Logout extends Component {
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
