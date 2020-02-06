import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class FormLogin extends Component {
    render() {
        return (
            <Fragment>
                <form method="POST" action="">       
                             
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label text-md-right"> Email: </label>
                        <div className="col-md-6">
                            <input type="email" className="form-control " name="email" required  />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label text-md-right"> Password: </label>
                        <div className="col-md-6">
                            <input type="password" className="form-control " name="password" required  />
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