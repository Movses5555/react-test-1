import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

import FormLogin from './FormLogin'


// _loginUser = (email, password) => {
//     $("#login-form button")
//       .attr("disabled", "disabled")
//       .html(
//         '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
//       );
//     var formData = new FormData();
//     formData.append("email", email);
//     formData.append("password", password);

//     axios
//       .post("http://localhost:8000/api/user/login/", formData)
//       .then(response => {
//         console.log(response);
//         return response;
//       })
//       .then(json => {
//         if (json.data.success) {
//           alert("Login Successful!");

//           let userData = {
//             name: json.data.data.name,
//             id: json.data.data.id,
//             email: json.data.data.email,
//             auth_token: json.data.data.auth_token,
//             timestamp: new Date().toString()
//           };
//           let appState = {
//             isLoggedIn: true,
//             user: userData
//           };
//           // save app state with user date in local storage
//           localStorage["appState"] = JSON.stringify(appState);
//           this.setState({
//             isLoggedIn: appState.isLoggedIn,
//             user: appState.user
//           });
//         } else alert("Login Failed!");

//         $("#login-form button")
//           .removeAttr("disabled")
//           .html("Login");
//       })
//       .catch(error => {
//         alert(`An Error Occured! ${error}`);
//         $("#login-form button")
//           .removeAttr("disabled")
//           .html("Login");
//       });
//   };




class Login extends Component {
    render() {
        
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link to="/">Home</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="card">
                                <div className="card-header">Login</div>

                                <div className="card-body">
                                    < FormLogin />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}


export default Login;