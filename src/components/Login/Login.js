import React, { useRef } from 'react';
import '../SignUp/SignUp.scss';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { login } from '../../features/user/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
export const Login = () => {
    const emailRef = useRef();
    const pwdRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        let user;
        try {
            setErr('');
            const logInRes = await auth.signInWithEmailAndPassword(
                emailRef.current.value,
                pwdRef.current.value
            );
            user = logInRes.user;
        } catch (err) {
            return setErr('Failed to Login!!!');
        }
        console.log(user);
        dispatch(login(user));
        navigate('/profile');
    };
    return (
        <div className='auth-container'>
            <div className='auth-container-wrapper'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='auth-wrapper'>
                        <div className='auth-header'>
                            <h2>Login</h2>
                        </div>
                        <div className='auth-label'>
                            <label htmlFor='Email'>Email</label>
                        </div>
                        <div className='auth-input'>
                            <input
                                type='email'
                                name='email'
                                placeholder='Enter Your Email'
                                ref={emailRef}
                                required
                            />
                        </div>
                        <div className='auth-label'>
                            <label htmlFor='pwd'>Password</label>
                        </div>
                        <div className='auth-input'>
                            <input
                                type='password'
                                name='pwd'
                                placeholder='Enter Your Password'
                                ref={pwdRef}
                                required
                            />
                        </div>
                        <div className='forget'>
                            <Link
                                to='/forget'
                                style={{ fontSize: '13px', color: '#007bff' }}
                            >
                                Forgot your Password?
                            </Link>
                        </div>
                        {err && (
                            <div
                                className='err-box'
                                style={{ marginTop: '10px' }}
                            >
                                <p>{err}</p>
                            </div>
                        )}
                        <div className='btn-box'>
                            <button type='submit'>Log in</button>
                        </div>
                    </div>
                </form>
                <div className='redirect'>
                    <h4>
                        <span>Need an Account? </span>
                        <Link to='/signup'>Sign Up</Link>
                    </h4>
                </div>
            </div>
        </div>
    );
};
