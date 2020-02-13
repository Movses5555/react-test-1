import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Apis from '../../Services/ApiService/Api.js';
import NavBar from '../NavBar';



class EmployeeCreate extends Component {
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
            companies: [],
            inProgress: true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.Api.getAllEmployees().then(res => {
            this.setState({companies : res.data.companies});
        })          
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.state.employee;
        this.Api.setEmployee(data)
            .then(response => { 
                const emptyData = {
                    firstname: '',
                    lastname: '',
                    company_id: '',
                    email: '',
                    phone: ''
                }
                
                this.setState({
                    employee : emptyData,
                    inProgress: false,
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    handleChange(e) {
        let value = e.target.value;
        const name = e.target.name;
        this.setState((state) => {
            return {
                employee: {
                    ...state.employee,
                    [name]: value
                }, 
            }

        });
    };

    render() {
        const {employee} = this.state;
        return (
            <Fragment>
                <NavBar></NavBar>
                
                
                <div className="m-4 text-right">
                    <Link to="/employees" className="btn btn-success mb-1">
                       Back
                    </Link>
                </div>

                <div>
                    <form method="POST" action="" onSubmit={this.handleSubmit}>  
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"> <b>First Name :</b> </label>
                            <div className="col-6">
                                <input type="text" 
                                    className="form-control " 
                                    name="firstname" 
                                    required  
                                    onChange={this.handleChange}
                                    value={employee.firstname}
                                />
                            </div>
                        </div>   
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"> <b>Last Name :</b> </label>
                            <div className="col-6">
                                <input type="text" 
                                    className="form-control " 
                                    name="lastname" 
                                    required  
                                    onChange={this.handleChange}
                                    value={employee.lastname}
                                />
                            </div>
                        </div>  

                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"><b> Company :</b> </label>
                            <div className="col-6">
                                <select name="company_id" className="form-control" id="company-id" value={employee.company_id} onChange={this.handleChange}>
                                    <option disabled value=''> Choose Company </option>
       
                                    {   
                                        this.state.companies.map(company => {
                                            return (
                                                <option key={company.id} value={company.id} className="form-control">{company.name}</option>
                                            )
                                        })
                                    }
                                
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"><b> Email :</b> </label>
                            <div className="col-6">
                                <input type="email" 
                                    className="form-control " 
                                    name="email" 
                                    required  
                                    onChange={this.handleChange}
                                    value={employee.email}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"> <b>Phone :</b> </label>
                            <div className="col-6">
                                <input type="text" 
                                    className="form-control " 
                                    name="phone" 
                                    required
                                    onChange={this.handleChange} 
                                    value={employee.phone}
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-4">
                            <label className="col-4 col-form-label text-right"> </label>
                            <div className="col-4 text-left">
                                <button type="submit" className="btn btn-primary">
                                    Create Employee
                                </button>
                            </div>
                        </div>
    
                    </form>
                    
                </div>
                
            </Fragment>
        );
    }
}


export default EmployeeCreate;