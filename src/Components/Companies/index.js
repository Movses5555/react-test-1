import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Paginate from '../Pageination'; 
import Apis from '../../Services/ApiService/Api.js';
import NavBar from '../NavBar';
import { getAllCompanies, deleteCompany } from '../../store/Actions/companies';
import SuccessMessage from '../successMsg';
class CompanyIndex extends Component {
    Api = new Apis();
    constructor(){
        super()
        this.state = {
            success : false
        }
        this.handleDelete = this.handleDelete.bind(this)
    }
    componentDidMount() 
    {    
        if ( this.props.location.state && this.props.location.state.success) {
            this.setState({
                success : this.props.location.state.success
            })
            setTimeout(()=>{
                this.setState({
                    success : null
                });
                this.props.location.state.success = null;
            }, 2000)
        }
        this.props.getAllCompanies();
    }
    handleDelete(id) {
        this.props.getAllCompanies(1);
        this.props.deleteCompany(id);
        this.props.history.push({
            pathname: '/companies',
            state: { success: true }
        });
    }
    render() {
        const { companies} = this.props.companies;
        const { ...allData } = this.props.allData;
        return (
            <Fragment>
                <NavBar></NavBar>
                <div className="m-4 text-right">
                    <Link to="/companies/create" className="btn btn-sm bg-primary">
                        Add
                    </Link> 
                </div>
                <SuccessMessage
                    message="Add Company"
                    success={this.state.success}
                />
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
                                                            onClick={() => this.handleDelete(company.id)}
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
                <div className="d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <Paginate
                                total={allData.last_page}
                                currentPage={allData.current_page}
                                click={page => this.props.getAllCompanies(page)}
                            />
                        </ul>
                    </nav>
                </div>
            </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        companies: state.companies,
        allData : state.companies.allData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCompanies: page => {dispatch(getAllCompanies(page))},
        deleteCompany: id => {dispatch(deleteCompany(id))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyIndex);

