/* eslint-disable array-callback-return */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Apis from '../../Services/ApiService/Api.js';
import NavBar from '../NavBar'

class EmployeeEdit extends Component {
    Api = new Apis();
    constructor(){
        super()
        this.state = {
            employee: {
                firstname: '',
                lastname: '',
                company_id: '',
                email: '',
                phone: ''
            },
            param: 'param',
            currentCompany: {
                id: '',
                name: '',
                email: '',
                logo: '',
                website: '',
                phone: ''
            },
            companies: [],
            errorMessage: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const id = Number(this.props.match.params.id);
        this.setState({param : id});
        this.Api.getAllEmployees()
            .then(res => {
                const resData = res.data;
                this.setState({
                    companies : resData.companies
                });
                const resEmp = resData.employees.data;
                for ( let i = 0; i < resEmp.length; i++ ) {
                    if ( resEmp[i].id === id ) {
                        this.setState({
                            employee : resEmp[i]
                        })
                    }
                }
                this.state.companies.map(company => {
                    if (company.id === Number(this.state.employee.company_id)) {
                        this.setState((state) => {
                            return {
                                currentCompany : {
                                    ...company
                                }
                            }    
                        });
                        
                    }
                })
            }) 
            .catch(err => { 
                this.setState({errorMessage: err.message});
            })
    }

    handleSubmit (e){
        e.preventDefault();
        const id = Number(this.props.match.params.id);
        const data = this.state.employee;
        this.Api.updateEmployee(id, data)
            .then((res) => {
                this.props.history.push('/employees');
            })
            .catch(err => { 
                this.setState({errorMessage: err.message});
            })
    }

    handleChange(e) {
        let value = e.target.value;
        const name = e.target.name;
        this.setState((state)=>{
            return {
                employee: {
                    ...state.employee,
                    [name]: value
                },
                companies : [...state.companies]       
            }
        })
    };

    render() {
        return (
            <Fragment>
                <NavBar></NavBar>
                <div className="m-4 text-right">
                    <Link to="/employees" className="btn btn-success mb-1">
                       Back
                    </Link>
                </div>
                <div>
                    <p>{this.state.errorMessage}</p>
                </div>
                <div>
                    <form method="POST" action="" onSubmit={this.handleSubmit}>  
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"> <b>First Name :</b> </label>
                            <div className="col-6">
                                <input type="text" 
                                    className="form-control " 
                                    name="firstname" 
                                    value={this.state.employee.firstname}
                                    required  
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>   
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"> <b>Last Name :</b> </label>
                            <div className="col-6">
                                <input type="text" 
                                    className="form-control " 
                                    name="lastname" 
                                    value={this.state.employee.lastname}
                                    required  
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>  
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"><b> Company :</b> </label>
                            <div className="col-6">
                                {    
                                    this.state.companies.map((company) => {
                                        if ( company.id === Number(this.state.employee.company_id)) {
                                            const compName = company.name;
                                            return (
                                                <select key={company.id} 
                                                        name="company_id" 
                                                        className="form-control" 
                                                        id={company.id} 
                                                        defaultValue={compName} 
                                                        onChange={this.handleChange}
                                                >
                                                    {
                                                        this.state.companies.map(item => {
                                                            return (
                                                                <option 
                                                                    key={item.id} 
                                                                    value={item.id} 
                                                                    className="form-control"
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>   
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"><b> Email :</b> </label>
                            <div className="col-6">
                                <input type="email" 
                                    className="form-control " 
                                    name="email" 
                                    value={this.state.employee.email}
                                    required  
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"> <b>Phone :</b> </label>
                            <div className="col-6">
                                <input type="text" 
                                    className="form-control " 
                                    name="phone" 
                                    value={this.state.employee.phone}
                                    required
                                    onChange={this.handleChange} 
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-4">
                            <label className="col-4 col-form-label text-right"> </label>
                            <div className="col-6 text-left">
                                <button type="submit" className="btn btn-primary">
                                    Edit Employee
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default EmployeeEdit;
