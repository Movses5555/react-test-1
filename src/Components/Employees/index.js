import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import NavBar from '../NavBar';
import Apis from '../../Services/ApiService/Api';
import { getAllEmployees, deleteEmployee} from '../../store/Actions/employees'


class EmployeeIndex extends Component {
    Api = new Apis();
    
    componentDidMount() 
    {   
        this.props.getAllEmployees();     
    }
    
    render() {
        const { employees, errors } = this.props.employees;
        return (
            <Fragment>
                <NavBar></NavBar>
                <div className="m-4 text-right">
                    <Link to="/employees/create" className="btn btn-sm bg-primary">
                        Add
                    </Link> 
                </div>
                <div>
                    <p>{errors}</p>
                </div>
                <div>
                    <table className="col-12 table " >
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
                            { 
                                employees.map(employee => {
                                    return (
                                        <tr className="row text-center m-0" key={employee.id}>
                                            <td className="col-2 pt-2">{employee.firstname} </td>
                                            <td className="col-2 pt-2">{employee.lastname}</td>
                                            <td className="col-2 pt-2">{employee.company_id}</td>
                                            <td className="col-2 pt-2">{employee.email}</td>
                                            <td className="col-2 pt-2">{employee.phone}</td>
                                            <td className="col-2">
                                                <div className="row">
                                                    <div className="float-left mr-2 col-3" >
                                                        <Link to={`/employees/${employee.id}/edit`}>
                                                            <button type="submit" className="btn btn-sm  bg-primary">
                                                                <i style={{fontSize:'18px', color: 'black'}} className='far'>&#xf044;</i>
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    <div className="float-left mr-2 col-3" >
                                                        <Link to={`/employees/${employee.id}`}>  
                                                            <button type="submit" className="btn btn-sm  bg-primary">
                                                                <i style={{fontSize:'18px'}} className="fa">&#xf06e;</i>
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    <div className="float-left mr-2 col-3" >
                                                        <button className="btn btn-sm bg-danger" onClick={() => this.props.deleteEmployee(employee.id)}>
                                                            <i style={{fontSize:'18px'}} className="fa">&#xf1f8;</i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>     
            </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        employees: state.employees
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAllEmployees: page => {dispatch(getAllEmployees(page))},
        deleteEmployee: id => {dispatch(deleteEmployee(id))}
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeIndex);
