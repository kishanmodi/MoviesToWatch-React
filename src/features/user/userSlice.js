import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    loginStatus: false,
    err: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signup: (state, { payload }) => {
            state.currentUser = payload;
            state.err = '';
            state.loginStatus = true;
        },
        login: (state, { payload }) => {
            state.currentUser = payload;
            state.err = '';
            state.loginStatus = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.err = '';
            state.loginStatus = false;
        },
        forgot: (state, { payload }) => {
            state.currentUser = payload;
            state.err = '';
        }
    }
});

export const { signup, login, logout } = userSlice.actions;

export default userSlice.reducer;
