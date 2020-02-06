import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Apis from '../../Services/ApiService/Api.js';



class CompIndex extends Component {
    Api = new Apis();
    constructor(){
        super()
        this.state = {
            companies: [],
        }
    }
    
    componentDidMount() 
    {

        this.Api.getAllCompanies().then(res => {
            this.setState({companies : res.data.data});
            console.log(this.state.companies);
        })      

    }

    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                <div className="m-4 text-right">
                    <Link to="/companies" className="btn btn-success mb-1">
                       Back
                    </Link>
                    
                </div>
                <div>
                    <form method="POST" action="">  
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"> <b>Name :</b> </label>
                            <div className="col-6">
                                <input type="text" className="form-control " name="name" required  />
                            </div>
                        </div>        
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label text-md-right"><b> Email :</b> </label>
                            <div className="col-6">
                                <input type="email" className="form-control " name="email" required  />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label text-md-right"> <b>Website :</b> </label>
                            <div className="col-6">
                                <input type="text" className="form-control " name="website" required  />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label text-md-right"> <b>Logo :</b> </label>
                            <div className="col-6">
                                <input type="file" className="form-control " name="logo" required  />
                            </div>
                        </div>
                        <div className="form-group row mb-4">
                            <label className="col-sm-4 col-form-label text-md-right"> </label>
                            <div className="col-4 text-left">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </div>


                        
    
                    </form>
                    
                </div>
                
            </Fragment>
        );
    }
}


export default CompIndex;