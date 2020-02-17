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
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.state.company;
        this.Api.setCompany(data)
            .then(response => { 
                this.props.history.push('/companies');
            })
            .catch(error => {
                console.log(error)
            });
    }

    handleFileChange(e) {
        const file = e.target.files[0];
        this.Api.fileUpload(file)
            .then(res=>{
                const data = this.state.company;
                data.logo = res.data.logo;
                this.setState({
                    company : data
                })
            })
            .catch((err) => {
                console.log('EEEEEE ----',err);
            })
    }

    handleChange(e) {
        let value = e.target.value;
        const name = e.target.name;
        console.log(value);
        this.setState((state)=>{
            return {
                company: {
                    ...state.company,
                    [name]: value
                }, 
            }
        });
    };

    render() {
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
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"> <b>Logo :</b> </label>
                            <div className="col-6">
                                <input type="file" 
                                    className="form-control " 
                                    name="logo" 
                                    onChange={this.handleFileChange}
                                />
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
