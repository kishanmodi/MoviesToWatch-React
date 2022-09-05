import React, { useRef, useState } from 'react';
import './SignUp.scss';
import { signup, authSignUp } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { auth, googleProvider } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
export const SignUp = () => {
    const emailRef = useRef();
    const pwdRef = useRef();
    const pwdCnfRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    const re = new RegExp('^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$');
    const handleSubmit = async (e) => {
        e.preventDefault();
        let user;
        try {
            setErr('');
            if (pwdRef.current.value !== pwdCnfRef.current.value) {
                return setErr("Password doesn't match!!!");
            } else if (!re.test(pwdRef.current.value)) {
                return setErr(
                    'Password should be atleast 8 chars long and must contain a combination of uppercase, lowercase letter, number and special character.'
                );
            }
            const signUpRes = await auth.createUserWithEmailAndPassword(
                emailRef.current.value,
                pwdRef.current.value
            );
            user = signUpRes.user;
        } catch (err) {
            if (err.code === 'auth/email-already-in-use')
                return setErr('Email Already in Use!!!');
            else if (
                err.code === 'auth/invalid-password' ||
                err.code === 'auth/invalid-email'
            ) {
                return setErr('Email/Password is Invalid!!!');
            } else {
                return setErr('Failed to create Account!!!');
            }
        }
        dispatch(signup(user));
        navigate('/profile');
    };
    const HandleAuthSignUp = async (e) => {
        e.preventDefault();
        let user;
        try {
            const authRes = await auth.signInWithPopup(googleProvider);
            user = authRes.user;
        } catch (err) {
            return setErr('Failed to create Account!!!');
        }
        dispatch(authSignUp(user));
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
                <div className='auth-box'>
                    <button
                        id='auth'
                        onClick={HandleAuthSignUp}
                    >
                        Sign up with Google
                    </button>
                </div>
            </div>
        </div>
    );
};
