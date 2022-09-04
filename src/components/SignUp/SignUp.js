import React, { useRef, useState } from 'react';
import './SignUp.scss';
import { signup } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
export const SignUp = () => {
    const emailRef = useRef();
    const pwdRef = useRef();
    const pwdCnfRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        let user;
        try {
            setErr('');
            if (pwdRef.current.value !== pwdCnfRef.current.value) {
                return setErr("Password doesn't match!!!");
            }
            const signUpRes = await auth.createUserWithEmailAndPassword(
                emailRef.current.value,
                pwdRef.current.value
            );
            user = signUpRes.user;
        } catch (err) {
            return setErr('Failed to create account');
        }
        dispatch(signup(user));
        navigate('/profile');
    };

    return (
        <div className='auth-container'>
            <div className='auth-container-wrapper'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='auth-wrapper'>
                        <div className='auth-header'>
                            <h2>Sign Up</h2>
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
                        <div className='auth-label'>
                            <label htmlFor='pwd-cnf'>Confirm Password</label>
                        </div>
                        <div className='auth-input'>
                            <input
                                type='password'
                                name='pwd-cnf'
                                placeholder='Confirm Your Password'
                                ref={pwdCnfRef}
                                required
                            />
                        </div>
                        {err && (
                            <div className='err-box'>
                                <p>{err}</p>
                            </div>
                        )}
                        <div className='btn-box'>
                            <button type='submit'>Sign Up</button>
                        </div>
                    </div>
                </form>
                <div className='redirect'>
                    <h4>
                        <span>Already Have an Account? </span>
                        <Link to='/login'>Log in</Link>
                    </h4>
                </div>
            </div>
        </div>
    );
};
