import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render () {
        return (
            <Fragment>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <button className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarTogglerDemo03" 
                        aria-controls="navbarTogglerDemo03" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link to="/companies" className='nav-link'>Companies</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/employees" className='nav-link'>Employees</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/logout" className='nav-link'>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </Fragment>
        )
    } 
}

export default NavBar;
