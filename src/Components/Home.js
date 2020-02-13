import React, { Component } from 'react';

import { Link } from 'react-router-dom';

// import Login from './Login'

class Home extends Component {
    render() {
        return (
            
                <div>
                    <nav className="navbar navbar-expand navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    <Link to="/login">Login</Link>
                                </li>
                            </ul>
                        </div>
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
