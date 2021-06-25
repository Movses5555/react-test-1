import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import Apis from '../../Services/ApiService/Api';


class EmployeeShow extends Component {
    Api = new Apis();
    constructor(){
        super();
        this.state = {
            employee: {
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                company: {}
            },
        };
    }
    
    componentDidMount() 
    {   
        const id = Number(this.props.match.params.id);
        this.Api.getEmployee(id) 
            .then(res => {
                const employee = res.data;
                this.setState({
                    employee : employee
                })
            })
            .catch(err => {
                throw err;
            })
    }

    render() {
        const {employee} = this.state;
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
                             <p className='col-6 text-left'> { employee.firstname } </p>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='row'>
                             <p className='col-6 text-right'><b> Last Name :  </b></p>
                             <p className='col-6 text-left'> { employee.lastname } </p>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='row'>
                             <p className='col-6 text-right'><b> Company :  </b></p>
                             <p className='col-6 text-left'> { employee.company.name } </p>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='row'>
                             <p className='col-6 text-right'><b> Email :  </b></p>
                             <p className='col-6 text-left'> { employee.email } </p>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='row'>
                             <p className='col-6 text-right'><b> Phone :  </b></p>
                             <p className='col-6 text-left'> { employee.phone } </p>
                        </div>
                    </div>
                </div>            
            </Fragment>
        );
    }
}

export default EmployeeShow;
