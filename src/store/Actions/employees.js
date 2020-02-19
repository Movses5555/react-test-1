import {
    GET_ALL_EMPLOYEES,
    DELETE_EMPLOYEE,
} from "./types";
import Api from "../../Services/ApiService/Api";

const api = new Api();

export const getAllEmployees =  (page = 1) => {
    return dispatch => {
        api.getAllEmployees(page)
                .then(res => {
                    dispatch(
                        {
                            type: GET_ALL_EMPLOYEES,
                            payload: res.data.employees
                        }
                    );
                })
                .catch(error => {
                    throw error;
                });
    };
};

export const deleteEmployee = (id) => {
    return dispatch => {
        api.destroyEmployee(id)
            .then(response => {
                dispatch(
                    {
                        type: DELETE_EMPLOYEE,
                        payload: {response , id}
                    }
                );
            })
            .catch(error => {
                if(error.response && error.response.status === 422) {
                    dispatch(
                        {
                            type: DELETE_EMPLOYEE,
                            payload: error.response
                        }
                    );
                }
            });
    };
};

