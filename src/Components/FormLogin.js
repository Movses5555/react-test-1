import React, { Component, Fragment } from 'react';
import Apis from '../Services/ApiService/Api'

class FormLogin extends Component {
    Api = new Apis();

    constructor(props){
        super(props);
        this.state = {
            user : {
                email : '',
                password : ''
            },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const data = this.state.user;
        this.Api.signIn(data).then(res => {
            localStorage.setItem('token', res.data.access_token);
            this.props.props.history.push('/companies');
        });
    }
   
    handleChange(e) {
        let value = e.target.value;
        const name = e.target.name;
        this.setState((state) => {
            return {
                user: {
                    ...state.user,
                    [name]: value
                }    
            }
        })
    }

    render() {

        return (
            <Fragment>
                <form method="POST" onSubmit={this.handleSubmit}>       
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label text-md-right"> Email: </label>
                        <div className="col-md-6">
                            <input type="email" 
                                className="form-control " 
                                name="email" 
                                required  
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label text-md-right"> Password: </label>
                        <div className="col-md-6">
                            <input type="password" 
                                className="form-control " 
                                name="password" 
                                required  
                                onChange={this.handleChange}    
                            />
                        </div>
                    </div>
                    <div className="form-group row mb-4">
                        <div className="col-md-8 offset-md-4 text-left">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </Fragment>
        );
    }
}


export default FormLogin