import React, { useState } from 'react';
import user from '../../images/user.png';
import movie from '../../images/movie.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import {
    fetchAsyncMovies,
    fetchAsyncShows
} from '../../features/movies/movieSlice';
import { useDispatch } from 'react-redux';
export const Header = () => {
    const dispatch = useDispatch();
    const [term, setTerm] = useState('');
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        if (term === '') {
            alert('Enter Valid Query');
        } else {
            dispatch(fetchAsyncMovies(term));
            dispatch(fetchAsyncShows(term));
            navigate('/');
        }
        setTerm('');
    };
    return (
        <div className='header'>
            <div className='logo'>
                <Link to='/'>
                    <div className='brand'>
                        <img
                            src={movie}
                            alt='MoviesToWatch'
                        />
                        <div>MoviesToWatch</div>
                    </div>
                </Link>
            </div>
            <div className='search-bar'>
                <form onSubmit={submitHandler}>
                    <input
                        type='text'
                        value={term}
                        placeholder='Search...'
                        onChange={(e) => setTerm(e.target.value)}
                    />
                    <button type='submit'>
                        <i className='fa fa-search'></i>
                    </button>
                </form>
            </div>
            <div className='user-image'>
                <img
                    src={user}
                    alt='user'
                />
            </div>
        </div>
    );
};
