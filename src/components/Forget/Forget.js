import React, { useRef, useState } from 'react';
import '../SignUp/SignUp.scss';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
export const Forget = () => {
    const emailRef = useRef();
    const [err, setErr] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setErr('');
            await auth.sendPasswordResetEmail(emailRef.current.value);
        } catch (err) {
            return setErr('Failed to send Email');
        }
        setErr('Check email for information!!!');
    };

    return (
        <div className='auth-container'>
            <div className='auth-container-wrapper'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='auth-wrapper'>
                        <div className='auth-header'>
                            <h2>Change Password</h2>
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
                        {err && (
                            <div className='err-box'>
                                <p>{err}</p>
                            </div>
                        )}
                        <div className='btn-box'>
                            <button type='submit'>Send Email</button>
                        </div>
                    </div>
                </form>
                <div className='redirect'>
                    <h4>
                        <span>Return to Login? </span>
                        <Link to='/login'>Log in</Link>
                    </h4>
                </div>
            </div>
        </div>
    );
};
