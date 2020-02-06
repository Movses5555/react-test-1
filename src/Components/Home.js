import React, { Component, Fragment } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from './Login'

class Home extends Component {
    render() {
        return (
            
                <div>
                    <nav>
                        <ul style={{listStyleType: 'none'}}>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    </nav>

                    <div>
                        <h1>Hello Home</h1>
                    </div>

                    <hr />
                </div>
            
            
        );
    }
}





export default Home;
