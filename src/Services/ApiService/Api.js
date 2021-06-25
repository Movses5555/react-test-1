import axios from 'axios';


axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location = '/login';
    }
    return Promise.reject(error);
});

class Api {
    constructor() {
        this.Auth = axios.create();
    }


    baseUrl = process.env.REACT_APP_BASE_URL;
    companiesURL = `${this.baseUrl}/api/companies`;
    employeesURL = `${this.baseUrl}/api/employees`;

    getToken(){
        return localStorage.getItem('token');
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
            }
        });
    }
    updateCompany(id, data) {
        return this.Auth.put(`${this.companiesURL}/${id}`, data, {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`,
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
