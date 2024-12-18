'use client'
import createDataContext from "./createDataContext";
import axiosInstance from "../api/axios";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };

        case 'clear_error':
            return { ...state, errorMessage: '' }; // Clear error message

        case 'set_loading':
            return { ...state, loading: action.payload };

        case 'register':
        case 'sign_in':
            return {
                ...state,
                token: action.payload,
                errorMessage: '' // Clear error on success
            };

        case 'sign_out':
            return {
                ...state,
                token: null,
                errorMessage: ''
            };

        default:
            return state;
    }
};

// Clear any error before making a request
const clearError = (dispatch) => () => {
    dispatch({ type: 'clear_error' });
};
// Automatically load the token on app initialization
const loadToken = (dispatch) => () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        dispatch({ type: 'sign_in', payload: token });
    }
};

const register = (dispatch) => async ({ name, email, password }) => {
    dispatch({ type: 'clear_error' }); // Clear error before API call
    dispatch({ type: 'set_loading', payload: true }); // Start loading
    try {
        const response = await axiosInstance.post('/auth/Register', { name, email, password });
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        dispatch({ type: 'register', payload: token });
    } catch (e) {
        dispatch({ type: 'add_error', payload: 'Something went wrong' });
    } finally {
        dispatch({ type: 'set_loading', payload: false }); // Stop loading
    }
};

const signIn = (dispatch) => async ({ email, password }) => {
    dispatch({ type: 'set_loading', payload: true });
    try {
        const response = await axiosInstance.post('/auth/Login', { email, password });
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        dispatch({ type: 'sign_in', payload: token });
        return Promise.resolve(); // Return a resolved Promise on success
    } catch (e) {
        dispatch({ type: 'add_error', payload: 'Invalid credentials' });
        return Promise.reject(e); // Return a rejected Promise on error
    }
};


const signOut = (dispatch) => () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    dispatch({ type: 'sign_out' }); // Update state to reflect user is logged out
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { register, signIn, signOut, clearError, loadToken }, // Export clearError as well
    { token: null, errorMessage: '', loading: false }
);
