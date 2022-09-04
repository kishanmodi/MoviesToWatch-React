import React from 'react';
import '../SignUp/SignUp.scss';
import { logout } from '../../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Profile = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [err, setErr] = useState('');
    return (
        <div className='auth-container'>
            <div className='auth-container-wrapper'>
                <div className='auth-wrapper'>
                    <div className='auth-header'>
                        <h2>Profile</h2>
                    </div>
                    <div>
                        <h4>{currentUser.email}</h4>
                    </div>
                    <div className='err'>
                        <p>{err}</p>
                    </div>
                    <div className='btn-box'>
                        <button
                            onClick={async () => {
                                try {
                                    setErr('');
                                    await auth.signOut();
                                } catch (err) {
                                    return setErr('Failed to Logout!!');
                                }
                                dispatch(logout());
                            }}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
                <div className='redirect'>
                    <h4>
                        <span>Return to Dashboard? </span>
                        <Link to='/'>Dashboard</Link>
                    </h4>
                </div>
            </div>
        </div>
    );
};
