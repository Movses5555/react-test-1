import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';


class EmpIndex extends Component {
    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link to="/companies" className='nav-link'>Companies</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/employees" className='nav-link'>Employees</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/logout" className='nav-link'>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div>
                    <table className="mt-5 col-12 table " >
                        <thead>
                            <tr className="row text-center m-0">
                                <th className="col-2">First Name</th>
                                <th className="col-2">Last Name</th>
                                <th className="col-2">Company</th>
                                <th className="col-2">Email</th>
                                <th className="col-2">Phone</th>
                                <th className="col-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row text-center m-0">
                                <td className="col-2 pt-2"></td>
                                <td className="col-2 pt-2"></td>
                                <td className="col-2 pt-2"></td>
                                <td className="col-2 pt-2"></td>
                                <td className="col-2 pt-2"></td>
                                <td className="col-2 text-center">
                                    <div className="row">
                                        <div className="float-left mr-2 col-3" >
                                            <form method="GET" action="{{route('companies.edit', $item->id)}}">
                                                {/* @csrf */}
                                                <button type="submit" className="btn btn-sm  bg-primary">
                                                    <i style={{fontSize:'18px'}} className='far'>&#xf044;</i>
                                                </button>
                                            </form>
                                        </div>
                                        <div className="float-left mr-2 col-3" >
                                            <form method="GET" action="{{route('companies.show', $item->id)}}">
                                                {/* @csrf */}
                                                <button type="submit" className="btn btn-sm  bg-primary">
                                                    <i style={{fontSize:'18px'}} className="fa">&#xf06e;</i>
                                                </button>
                                            </form>
                                        </div>
                                        <div className="float-left mr-2 col-3" >
                                            <form method="POST" action="{{route('companies.destroy', $item->id)}}">
                                                {/* @csrf
                                                @method('DELETE') */}
                                                <button type="submit" className="btn btn-sm bg-danger">
                                                    <i style={{fontSize:'18px'}} className="fa">&#xf1f8;</i>
                                                </button>
                                            </form>

                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                            {/* <td class="col-2 text-center">
                                <div class="row">
                                    <div class="float-left mr-2 col-3" >
                                        <form method="GET" action="{{route('employees.edit', $item->id)}}">
                                            @csrf
                                            <button type="submit" class="btn btn-sm  bg-primary">
                                                <i style='font-size:18px' class='far'>&#xf044;</i>
                                            </button>
                                        </form>
                                    </div>
                                    <div class="float-left mr-2 col-3" >
                                        <form method="GET" action="{{route('employees.show', $item->id)}}">
                                            @csrf
                                            <button type="submit" class="btn btn-sm  bg-primary">
                                                <i style="font-size:18px" class="fa">&#xf06e;</i>
                                            </button>
                                        </form>
                                    </div>
                                    <div class="float-left mr-2 col-3" >
                                        <form method="POST" action="{{route('employees.destroy', $item->id)}}">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-sm bg-danger">
                                                <i style="font-size:18px;" class="fa">&#xf1f8;</i>
                                            </button>
                                        </form>

                                    </div>
                                </div>
                            </td> */}
                {/* <div className="text-center">
                    <h2 className="noBlog">You don't have a Company</h2>
                </div> */}
                
            </div>
            </Fragment>
        );
    }
}


export default EmpIndex;