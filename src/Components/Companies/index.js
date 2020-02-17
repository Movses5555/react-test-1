import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Apis from '../../Services/ApiService/Api.js';
import NavBar from '../NavBar';
import { getAllCompanies, deleteCompany } from '../../store/Actions/companies';

class CompanyIndex extends Component {
    Api = new Apis();
    
    componentDidMount() 
    {      
        this.props.getAllCompanies();
    }

    render() {
        const { companies } = this.props.companies;
        return (
            <Fragment>
                <NavBar></NavBar>
                <div className="m-4 text-right">
                    <Link to="/companies/create" className="btn btn-sm bg-primary">
                        Add
                    </Link> 
                </div>
                <div>
                    {/* <p>{this.state.errorMessage}</p> */}
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
                            { 
                                companies.map((company => {
                                    return (
                                        <tr className="row text-center m-0" key={company.id}>
                                            <td className="col-2 pt-2">
                                                <img src={this.Api.getImage(company.logo)} 
                                                    alt={company.logo} style={{ width: '50px', height: '50px' }} 
                                                />
                                            </td>
                                            <td className="col-2 pt-2">{company.name}</td>
                                            <td className="col-3 pt-2">{company.email}</td>
                                            <td className="col-3 pt-2">{company.website}</td>
                                            <td className="col-2">
                                                <div className="row">
                                                    <div className="float-left mr-2 col-3" >
                                                        <Link to={`/companies/${company.id}/edit`}>
                                                            <button type="submit" className="btn btn-sm  bg-primary">
                                                                <i style={{fontSize:'18px', color: 'black'}} 
                                                                    className='far'
                                                                >
                                                                    &#xf044;
                                                                </i>
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
                                                        <button className="btn btn-sm bg-danger" 
                                                            onClick={() => this.props.deleteCompany(company.id)}
                                                        >
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
const mapStateToProps = state => {
    return {
        companies: state.companies
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCompanies: page => {dispatch(getAllCompanies(page))},
        deleteCompany: id => {dispatch(deleteCompany(id))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyIndex);
//export default CompanyIndex;
