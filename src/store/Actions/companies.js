import {
    DELETE_COMPANY,
    GET_ALL_COMPANIES,
} from "./types";
import Api from "../../Services/ApiService/Api";

const api = new Api();

export const getAllCompanies =  (page = 1) => {
    return dispatch => {
        api.getAllCompanies(page)
            .then(res => {
                dispatch(
                    {
                        type: GET_ALL_COMPANIES,
                        payload: res.data
                    }
                );
            })
            .catch(error => {
                throw error;
            });
    };
};

export const deleteCompany = (id) => {

    return dispatch => {
        api.destroyCompany(id)
            .then(response => {
                dispatch(
                    {
                        type: DELETE_COMPANY,
                        payload: {response , id}
                    }
                );
            })
            .catch(error => {
                if(error.response && error.response.status === 422) {
                    dispatch(
                        {
                            type: DELETE_COMPANY,
                            payload: error.response
                        }
                    );
                }
            });
    };
};
