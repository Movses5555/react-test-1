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

    componentDidMount() {
        this.Api.getAllEmployees()
        .then(res => {
            this.setState({companies : res.data.companies});
        })  
        .catch(err => {
            this.setState({errorMessage: err.message});
        });        
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.state.employee;
        this.Api.setEmployee(data)
            .then(res => { 
                this.props.history.push({
                    pathname: '/employees',
                    state: { success: true }
                });
            })
            .catch(err => {
                this.setState({errorMessage: err.message});
            });
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
            RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        const { name , value } = e.target;
        let errors = this.state.errors;
        this.setState((state) => {
            return {
                employee: {
                    ...state.employee,
                    [name]: value
                }, 
            }
        });
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
        const {employee} = this.state;
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
                                    required  
                                    onChange={this.handleChange}
                                    value={employee.firstname}
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
                                    required  
                                    onChange={this.handleChange}
                                    value={employee.lastname}
                                />
                                {errors.lastname.length > 0 &&  <span className='text-danger'>{errors.lastname}</span>}
                            </div>
                        </div>  
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"><b> Company :</b> </label>
                            <div className="col-6">
                                <select name="company_id" 
                                    className="form-control" 
                                    id="company-id" 
                                    value={employee.company_id} 
                                    onChange={this.handleChange}
                                >
                                    <option disabled value=''> Choose Company </option>
                                    {   
                                        this.state.companies.map(company => {
                                            return (
                                                <option key={company.id} 
                                                    value={company.id} 
                                                    className="form-control"
                                                >
                                                    {company.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                {errors.company_id.length > 0 &&  <span className='text-danger'>{errors.company_id}</span>}
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
                                {errors.email.length > 0 &&  <span className='text-danger'>{errors.email}</span>}
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
                                {errors.phone.length > 0 &&  <span className='text-danger'>{errors.phone}</span>}
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
