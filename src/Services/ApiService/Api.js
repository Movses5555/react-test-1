import axios from 'axios';


class Api {
    constructor() {
        this.Auth = axios.create();
        this.Auth.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
                throw error;
            }
        );
    }
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }

    baseUrl = 'http://laravel.loc';
    companiesURL = `${this.baseUrl}/api/companies`;
    employeesURL = `${this.baseUrl}/api/employees`;
    imgURL = "http://laravel.loc/storage/";

    getToken(){
        return localStorage.getItem('token');
    }
    getImage(image) {
        return this.imgURL + image;
    }
    signIn(data) {
        return axios.post(`${this.baseUrl}/api/auth/login`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        });
    }
    fileUpload(data) {
        var formData = new FormData();
        formData.set('logo', data);
        
        return axios.post(`${this.baseUrl}/upload`, formData, {
            headers: {
                'Authorization': `bearer ${this.getToken()}`,
                'Content-Type': "multipart/form-data",
            }
        })
    }

    
    ///                       Companies 

    getAllCompanies(page = 1) {
        return this.Auth.get(`${this.companiesURL}?page=${page}` , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            }
        });
    }  
    getCompany(id) {
        return this.Auth.get(`${this.companiesURL}/${id}` , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            }
        });
    }
    setCompany(data) {
        return this.Auth.post(this.companiesURL, data, {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`,
                //"Content-Type": "multipart/form-data",
            }
        });
    }
    updateCompany(id, data) {
        return this.Auth.put(`${this.companiesURL}/${id}`, data, {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`,
                // "Content-Type": "application/x-www-form-urlencoded",
                //"Content-Type": "multipart/form-data",
                'Accept': 'application/json'
            }
        });
    }
    destroyCompany(id) {
        return this.Auth.delete(`${this.companiesURL}/${id}` , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            }
        });
    }


    /////               Employyes

    getAllEmployees(page = 1) {
        return this.Auth.get(`${this.employeesURL}?page=${page}` , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            }
        });
    }
    getEmployee(id) {
        return this.Auth.get(`${this.employeesURL}/${id}` , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            },
        });
    }
    setEmployee(data) {
        return this.Auth.post(`${this.employeesURL}`, data , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            }
        });
    }
    updateEmployee(id, data) {
        return this.Auth.put(`${this.employeesURL}/${id}`, data , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`,
                //"Content-Type": "multipart/form-data",
                'Accept': 'application/json'
            }
        });
    }
    destroyEmployee(id) {
        return this.Auth.delete(`${this.employeesURL}/${id}` , {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`
            }
        });
    };
}
export default Api;


