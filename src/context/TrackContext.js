'use client';
import createDataContext from './createDataContext';
import axiosInstance from '@/api/axios';

const trackReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };

        case 'clear_error':
            return { ...state, errorMessage: '' };

        case 'set_loading':
            return { ...state, loading: action.payload };

        case 'load_tracks':
            return { ...state, tracks: action.payload };

        default:
            return state;
    }
};

// Clear any error
const clearError = (dispatch) => () => {
    dispatch({ type: 'clear_error' });
};

// Fetch tracks (images are included in the API response)
const fetchTracks = (dispatch) => async () => {
    dispatch({ type: 'set_loading', payload: true });

    try {
        // Fetch tracks from the API route
        const response = await axiosInstance.get('/Tracks'); // Matches the `/api/tracks` route
        const tracks = response.data;

        // Dispatch tracks to the reducer
        dispatch({ type: 'load_tracks', payload: tracks });
    } catch (error) {
        dispatch({
            type: 'add_error',
            payload: error.response?.data?.error || 'Unable to fetch tracks.',
        });
    } finally {
        dispatch({ type: 'set_loading', payload: false });
    }
};

// Create and export the context
export const { Provider, Context } = createDataContext(
    trackReducer,
    { clearError, fetchTracks },
    { tracks: [], errorMessage: '', loading: false }
);
