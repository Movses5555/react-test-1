import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Apis from '../../Services/ApiService/Api.js';
import NavBar from '../NavBar';



class CompanyEdit extends Component {
    Api = new Apis();
    constructor(){
        super()
        this.state = {
            company: {
                id : '',
                name: '',
                email: '',
                website: '',
                logo: ''
            },
            param: 1,
            companies: [],
            imgUrl: '',
            inProgress: true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
    }

    componentDidMount(){
        const id = Number(this.props.match.params.id);
        this.setState({param : id})

        this.setState({imgUrl : this.Api.imgURL});

        this.Api.getCompany(id)
            .then(res => {
                const data = res.data;
                this.setState((state)=>{
                    return {
                        company: data,
                        inProgress: false,
                    }
                })
            })
            .catch(err => {
                console.log('Error : ', err)
            })        
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

    handelSubmit (e){
        e.preventDefault();
        const data = this.state.company;
        this.Api.updateCompany(data.id, data)
            .then((res) => {
                this.setState((state)=>{
                    state.successAdd = res;
                })
                this.props.history.push('/companies');
            })
    }

    handleChange(e) {
        let value = e.target.value;
        const name = e.target.name;
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
            !this.state.inProgress && (
            <Fragment>
                <NavBar></NavBar>
                
                <div className="m-4 text-right">
                    <Link to="/companies" className="btn btn-success mb-1">
                       Back
                    </Link>
                </div>
                <div>
                    <form method="POST" action="" onSubmit={this.handelSubmit}>  
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"> <b>Name :</b> </label>
                            <div className="col-6">
                                <input type="text" 
                                    className="form-control " 
                                    name="name"
                                    required  
                                    value = {this.state.company.name} 
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
                                    value = {this.state.company.email} 
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
                                    value = {this.state.company.website}  
                                    required
                                    onChange={this.handleChange} 
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label text-right"> <b>Logo :</b> </label>
                            <div className="col-6 mb-3">
                                <input type="file" 
                                    className="form-control " 
                                    name="logo" 
                                    ref = {this.state.company.name} 
                                    onChange={this.handleFileChange}
                                />
                                    <img style={{'width' : '50px', 'height': 'auto'}}  
                                        src={ this.state.imgUrl + this.state.company.logo} 
                                        alt={this.state.company.logo}/>
                            </div>
                        </div>

                        <div className="form-group row mb-4">
                            <label className="col-4 col-form-label text-right"> </label>
                            <div className="col-4 text-left">
                                <button type="submit" className="btn btn-primary">
                                    Updata
                                </button>
                            </div>
                        </div>
                    </form>
                    
                </div>
                
            </Fragment>
            )
        );
    }
}


export default CompanyEdit;
