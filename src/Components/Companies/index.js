import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Apis from '../../Services/ApiService/Api.js';
import NavBar from '../NavBar';



class CompanyIndex extends Component {

    Api = new Apis();

    constructor(){
        super();
        this.state = {
            companies: [],
            errorMessage: '',
            imgUrl : "",
        };
        this.handleDelete = this.handleDelete.bind(this)
    }
    
    componentDidMount() 
    {   
        this.setState({imgUrl : this.Api.imgURL});
        
        this.Api.getAllCompanies()
            .then(res => {
                this.setState({companies : res.data.data});
            }).catch(err => {
                this.setState({errorMessage: err})
            })      
    }
    handleDelete(id)
    {   
        const data = this.state.companies;
        this.Api.destroyCompany(id)
            .then(res => {
                const newData = data.filter(item => id !== item.id);
                this.setState({companies : newData})
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <Fragment>
                <NavBar></NavBar>
                <div className="m-4 text-right">
                    <Link to="/companies/create" className="btn btn-sm bg-primary">
                        Add
                    </Link> 
                </div>
                <div>
                    <p>{this.state.errorMessage}</p>
                </div>
                <div className="mt-5">              
                    <table className="col-12 table " >
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
                                            <img src={this.state.imgUrl + company.logo} alt={company.logo} style={{ width: '50px', height: '50px' }} />
                                        </td>
                                        <td className="col-2 pt-2">{company.name}</td>
                                        <td className="col-3 pt-2">{company.email}</td>
                                        <td className="col-3 pt-2">{company.website}</td>
                                        <td className="col-2">
                                            <div className="row">
                                                <div className="float-left mr-2 col-3" >
                                                    <Link to={`/companies/${company.id}/edit`}>
                                                        <button type="submit" className="btn btn-sm  bg-primary">
                                                            <i style={{fontSize:'18px', color: 'black'}} className='far'>&#xf044;</i>
                                                        </button>
                                                    </Link>
                                                    
                                                    
                                                </div>
                                                <div className="float-left mr-2 col-3" >
                                                    <Link to={`/companies/${company.id}`}>  
                                                        <button type="submit" className="btn btn-sm  bg-primary">
                                                            <i style={{fontSize:'18px'}} className="fa">&#xf06e;</i>
                                                        </button>
                                                    </Link>
                                                </div>
                                                <div className="float-left mr-2 col-3" >
                                                <button className="btn btn-sm bg-danger" onClick={() => this.handleDelete(company.id)}>
                                                            <i style={{fontSize:'18px'}} className="fa">&#xf1f8;</i>
                                                        </button>

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