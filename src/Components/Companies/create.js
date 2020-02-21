import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Apis from '../../Services/ApiService/Api.js';
import NavBar from '../NavBar';

class CompanyCreate extends Component {
    Api = new Apis();
    constructor(){
        super()
        this.state = {
            company: {
                name: '',
                email: '',
                website: '',
                logo: ''
            },
            success: false,
            email: null,
            password: null,
            errorMessage: [],
            errors: {
                name: '',
                email: '',
                website: '',
                logo: '',
            },
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this)
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.validateForm(this.state.errors)) {
            const data = this.state.company;
            this.Api.setCompany(data)
                .then(res => { 
                    this.props.history.push({
                        pathname: '/companies',
                        state: { success: true, message : 'Add Company' }
                    });
                })
                .catch(err => {
                    this.setState({errorMessage: err.message});
                });
        }
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    handleFileChange(e) {
        const file = e.target.files[0];
        const name = e.target.name;
        this.Api.fileUpload(file)
            .then(res=>{
                const data = this.state.company;
                data.logo = res.data.logo;
                let errors = this.state.errors;
                switch (name) {
                    case 'logo': 
                      errors.logo = file ? '' : 'File not upload!';
                      break;
                    default:
                      break;
                  }
                this.setState({
                    company : data,
                })
                this.setState({errors, [name]: data.logo})
            })
            .catch((err) => {
                this.setState({errorMessage: err.message});;
            })
    }

    handleChange(e) {
        const validEmailRegex = 
            RegExp(/^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i);
        const { name , value } = e.target;
        let errors = this.state.errors;
        this.setState((state)=>{
            return {
                company: {
                    ...state.company,
                    [name]: value
                }, 
            }
        });
        switch (name) {
            case 'name': 
              errors.name = 
                value.length > 2
                  ? ''
                  : 'Name must be 2 characters long!';
              break;
            case 'email': 
              errors.email = 
                validEmailRegex.test(value)
                  ? ''
                  : 'Email is not valid!';
              break;
            case 'website': 
              errors.website = 
                value.length < 2
                  ? 'Website must be 2 characters long!'
                  : '';
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
                <div>
                    <p>{this.state.successAdd}</p>
                </div>
                <div className="m-4 text-right">
                    <Link to="/companies" className="btn btn-success mb-1">
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
                    <form method="POST" action="" multiple onSubmit={this.handleSubmit} >  
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"> <b>Name :</b> </label>
                            <div className="col-6">
                                <input type="text" 
                                    className="form-control " 
                                    name="name" 
                                    required  
                                    onChange={this.handleChange}
                                />
                                {errors.name.length > 0 &&  <span className='text-danger'>{errors.name}</span>}
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
                                />
                                {errors.email.length > 0 &&  <span className='text-danger'>{errors.email}</span>}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"> <b>Website :</b> </label>
                            <div className="col-6">
                                <input type="text" 
                                    className="form-control " 
                                    name="website" 
                                    required
                                    onChange={this.handleChange} 
                                />
                                {errors.website.length > 0 &&  <span className='text-danger'>{errors.website}</span>}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"> <b>Logo :</b> </label>
                            <div className="col-6">
                                <input type="file" 
                                    className="form-control " 
                                    name="logo" 
                                    required
                                    onChange={this.handleFileChange}
                                />
                                {errors.logo.length > 0 &&  <span className='text-danger'>{errors.logo}</span>}
                            </div>
                        </div>
                        <div className="form-group row mb-4">
                            <label className="col-4 col-form-label text-right"> </label>
                            <div className="col-4 text-left">
                                <button type="submit" className="btn btn-primary">
                                    Create Company
                                </button>
                            </div>
                        </div>
                    </form>        
                </div>
            </Fragment>
        );
    }
}

export default CompanyCreate;
