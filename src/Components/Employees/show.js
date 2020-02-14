import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import Apis from '../../Services/ApiService/Api';


class EmployeeShow extends Component {
    Api = new Apis();
    constructor(){
        super();
        this.state = {
            employee: [],
            company: {},
            param: 'param',
        };
    }
    
    componentDidMount() 
    {   
        const id = Number(this.props.match.params.id);
        this.setState({param : id});
        this.Api.getAllEmployees().then(res => {
            const employees = res.data.employees.data;
            const companies = res.data.companies;
            employees.map(item => {
                if (item.id === this.state.param) {
                    this.setState({
                        employee : item
                    })
                }
            })
            for (let i = 0; i < companies.length; i++) {
                if (this.state.employee.company_id === companies[i].id) {
                    this.setState({
                        company : companies[i]
                    })
                }
            }
        })    
    }

    render() {
        return (
            <Fragment>
                <NavBar></NavBar>
                <div className="m-4 text-right">
                    <Link to="/employees" className="btn btn-success mb-1">
                       Back
                    </Link>
                </div>
                <div className='text-center row'>
                    <div className='col-12'>
                        <div className='row'>
                             <p className='col-6 text-right'><b> First Name :  </b></p>
                             <p className='col-6 text-left'> { this.state.employee.firstname } </p>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='row'>
                             <p className='col-6 text-right'><b> Last Name :  </b></p>
                             <p className='col-6 text-left'> { this.state.employee.lastname } </p>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='row'>
                             <p className='col-6 text-right'><b> Company :  </b></p>
                             <p className='col-6 text-left'> { this.state.company.name } </p>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='row'>
                             <p className='col-6 text-right'><b> Email :  </b></p>
                             <p className='col-6 text-left'> { this.state.employee.email } </p>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='row'>
                             <p className='col-6 text-right'><b> Phone :  </b></p>
                             <p className='col-6 text-left'> { this.state.employee.phone } </p>
                        </div>
                    </div>
                </div>            
            </Fragment>
        );
    }
}

export default EmployeeShow;
