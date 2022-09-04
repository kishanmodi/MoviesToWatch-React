import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
export const PrivateSignupLogin = ({ children }) => {
    const currentUser = useSelector((state) => state.user.currentUser);
    return !currentUser ? children : <Navigate to='/profile' />;
};
