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

    baseUrl = 'http://127.0.0.1:8000';
    companiesURL = `${this.baseUrl}/api/companies`;
    employeesURL = `${this.baseUrl}/api/employees`;
    imgURL = "http://127.0.0.1:8000/storage/";

    getToken(){
        return localStorage["token"] && JSON.parse(localStorage["token"]).access_token;
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
                "Content-Type": "multipart/form-data",
            }
        });
    }
    updateCompany(id, data) {
        return this.Auth.post(`${this.companiesURL}/${id}`, data, {
            headers: {
                'Authorization': `bearer  ${this.getToken()}`,
                "Content-Type": "multipart/form-data"
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




    getImage(image) {
        return this.imgURL + image;
    }

    signIn(data) {
        return axios.post(`${this.baseUrl}user/login`, data);
    }
    
}
export default Api;


