import {
    GET_ALL_COMPANIES,
    DELETE_COMPANY,
} from "../Actions/types";

const initialState = {
    companies: [],
    errors: [],
    success: false,
};

export default function companiesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_COMPANIES:
            return { ...state, companies: action.payload , errors: [] };
        case DELETE_COMPANY:
            if (action.payload.response.status === 422) {
                return {...state, errors: Object.values(action.payload.data.errors) , success: false};
            } else {
                const {companies} = {...state};
                const newCompanies = companies.filter(company => company.id !== action.payload.id);              
                return {...state, companies : newCompanies, success: true};
            }
        default:
            return state;
    }
}