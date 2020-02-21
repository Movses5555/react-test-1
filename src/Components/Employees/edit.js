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
            errorMessage: [],
            errors: {
                firstname: '',
                lastname: '',
                company_id: '',
                email: '',
                phone: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this)
    }

    componentDidMount(){
        const id = Number(this.props.match.params.id);
        this.setState({param : id});

        this.Api.getEmployee(id)
            .then(res => {
                this.setState({
                    employee : res.data
                });
            }) 
            .catch(err => { 
                this.setState({errorMessage: err.message});
            })

        this.Api.getAllCompanies()
            .then(res => {
                this.setState({
                    companies : res.data.data
                });
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

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    handleChange(e) {
        const validEmailRegex = 
            RegExp(/^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i);
        const { name , value } = e.target;
        let errors = this.state.errors;
        this.setState((state)=>{
            return {
                employee: {
                    ...state.employee,
                    [name]: value
                },
                companies : [...state.companies]       
            }
        })
        switch (name) {
            case 'firstname': 
              errors.firstname = 
                value.length > 2
                  ? ''
                  : 'First Name must be 2 characters long!';
              break;
            case 'lastname': 
              errors.lastname = 
                value.length > 2
                  ? ''
                  : 'Last Name must be 2 characters long!';
              break;
            case 'company_id': 
              errors.company_id = 
                value.length > 0
                  ? ''
                  : 'No selected Company!';
              break;
            case 'email': 
              errors.email = 
                validEmailRegex.test(value)
                  ? ''
                  : 'Email is not valid!';
              break;
            case 'phone': 
              errors.phone = isNaN(value) ? 'This is not number!' : '';
              break;
            default:
              break;
          }
        this.setState({errors, [name]: value})
    };

    render() {
        const {errors} = this.state;
        return (
            <Fragment>
                <NavBar></NavBar>
                <div className="m-4 text-right">
                    <Link to="/employees" className="btn btn-success mb-1">
                       Back
                    </Link>
                </div>
                {   
                    this.state.employees &&
                        <div className="alert alert-danger">
                            <ul>
                                {this.state.errorMessage.map((err, index) => (
                                    <li key={index}>{err}</li>
                                ))}
                            </ul>
                        </div>
                }
                
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
                                {errors.firstname.length > 0 &&  <span className='text-danger'>{errors.firstname}</span>}
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
                                {errors.lastname.length > 0 &&  <span className='text-danger'>{errors.lastname}</span>}
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
                                {errors.company_id.length > 0 &&  <span className='text-danger'>{errors.company_id}</span>}
                            
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
                                {errors.email.length > 0 &&  <span className='text-danger'>{errors.email}</span>}
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
                                {errors.phone.length > 0 &&  <span className='text-danger'>{errors.phone}</span>}
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
