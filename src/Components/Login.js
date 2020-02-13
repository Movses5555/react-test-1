import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

import FormLogin from './FormLogin'





class Login extends Component {
    constructor(){
        super();
        this.state = {
            history : ''
        }
    }
   
    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link to="/">Home</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="card">
                                <div className="card-header">Login</div>

                                <div className="card-body">
                                    < FormLogin  props={this.props}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }
}


export default Login;