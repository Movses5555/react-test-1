import {
    GET_ALL_EMPLOYEES,
    DELETE_EMPLOYEE
} from "../Actions/types";

const initialState = {
    employees: [],
    allData: [],
    errors: [],
    success: false,
};

export default function employeesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_EMPLOYEES:
                return { ...state, employees: action.payload.data, allData: action.payload, errors: []};
        case DELETE_EMPLOYEE:
            if (action.payload.response.status === 422) {
                return {...state, errors: Object.values(action.payload.data.errors) , success: false};
            } else {
                const {employees} = {...state};
                const newEmployees = employees.filter(employee => employee.id !== action.payload.id);              
                return {...state, employees : newEmployees, success: true};
            }
        default:
            return state;
    }
}








