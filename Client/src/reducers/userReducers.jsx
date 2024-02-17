import { LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_REQUEST,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstants"

export const userReducer = (state = { user: {} }, { type, payload}) => {
    switch (type) {
        case LOGIN_USER_REQUEST:
            
        case LOGIN_USER_SUCCESS:

        case LOGIN_USER_FAIL:

        case REGISTER_USER_REQUEST:

        case REGISTER_USER_SUCCESS:

        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: payload
            }
        
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }

        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: payload
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: payload
            }

        case LOGOUT_USER_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            }

        case LOGOUT_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}