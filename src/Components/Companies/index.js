import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Apis from '../../Services/ApiService/Api.js';



class CompanyIndex extends Component {
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
                    <Link to="/companies/create" className="btn btn-sm bg-primary">
                        Add
                    </Link> 
                </div>
                <div>              
                    <table className="mt-5 col-12 table " >
                        <thead>
                            <tr className="row text-center m-0">
                                <th className="col-2">Logo</th>
                                <th className="col-2">Name</th>
                                <th className="col-3">Email</th>
                                <th className="col-3">Website</th>
                                <th className="col-2">Action</th>
                            </tr>
                        </thead>
                        <tbody> 

                            { this.state.companies.map((company => {
                                return (
                                    <tr className="row text-center m-0" key={company.id}>
                                        <td className="col-2 pt-2">
                                            <img src={company.logo} alt='gh' style={{ width: '50px', height: '50px' }} />
                                        </td>
                                        <td className="col-2 pt-2">{company.name}</td>
                                        <td className="col-3 pt-2">{company.email}</td>
                                        <td className="col-3 pt-2">{company.website}</td>
                                        <td className="col-2">
                                            <div className="row">
                                                <div className="float-left mr-2 col-3" >
                                                    <form method="GET" action="{{route('companies.edit', $item->id)}}">
                                                 
                                                        <button type="submit" className="btn btn-sm  bg-primary">
                                                            <i style={{fontSize:'18px'}} className='far'>&#xf044;</i>
                                                        </button>
                                                    </form>
                                                </div>
                                                <div className="float-left mr-2 col-3" >
                                                    <form method="GET" action="{{route('companies.show', $item->id)}}">
                                                      
                                                        <button type="submit" className="btn btn-sm  bg-primary">
                                                            <i style={{fontSize:'18px'}} className="fa">&#xf06e;</i>
                                                        </button>
                                                    </form>
                                                </div>
                                                <div className="float-left mr-2 col-3" >
                                                    <form method="POST" action="{{route('companies.destroy', $item->id)}}">
                                                        
                                                        <button type="submit" className="btn btn-sm bg-danger">
                                                            <i style={{fontSize:'18px'}} className="fa">&#xf1f8;</i>
                                                        </button>
                                                    </form>

                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }))
                            
                            }
                        </tbody>
                    </table>
                
                
                </div>
                
            </Fragment>
        );
    }
}


export default CompanyIndex;