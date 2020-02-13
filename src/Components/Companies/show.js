import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Apis from '../../Services/ApiService/Api.js';
import NavBar from '../NavBar'



class CompanyShow extends Component {
    Api = new Apis();
    
    constructor(){
        super();
        this.state = {
            employee: [],
            company: {},
            param: 'param',
            imgUrl : '',
            inProgress: true,
            style : {
                maxWidth: '500px', 
                maxHeight: '300px',
                margin: '20px auto'
            }
        };
        
    }
    
    componentDidMount() 
    {    
        this.setState({imgUrl : this.Api.imgURL});

        const id = Number(this.props.match.params.id);
        this.setState({param : id});

        this.Api.getAllCompanies().then(res => {
            const companies = res.data.data;
            companies.map(item => {
                if (item.id === this.state.param) {
                    this.setState({
                        company : item,
                        inProgress: false,
                    })
                }
            })
           
        })    
    }

    render() {
        return (
            !this.state.inProgress && (
            <Fragment>
                <NavBar></NavBar>
                
                <div className="m-4 text-right">
                    <Link to="/companies" className="btn btn-success mb-1">
                       Back
                    </Link>
                </div>
                <div>
                <div className='text-center row'>
                    <div className='col-12' 
                        style={this.state.style}>
                        <div className='row'>
                            <div className='text-center m-4 w-100'>
                                <img className='w-50' src={this.state.imgUrl + this.state.company.logo} alt='logo' />
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='row'>
                             <p className='col-6 text-right'><b> Name :  </b></p>
                             <p className='col-6 text-left'> { this.state.company.name } </p>

                        </div>
                    </div>
                    
                    <div className='col-12'>
                        <div className='row'>
                             <p className='col-6 text-right'><b> Email :  </b></p>
                             <p className='col-6 text-left'> { this.state.company.email } </p>

                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='row'>
                             <p className='col-6 text-right'><b> Website :  </b></p>
                             <p className='col-6 text-left'> { this.state.company.website } </p>
                        </div>
                    </div>
                </div>  
                    
                </div>
                
            </Fragment>
            )
        );
    }
}


export default CompanyShow;
