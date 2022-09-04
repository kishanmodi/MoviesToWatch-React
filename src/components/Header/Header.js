import React, { useState, useCallback } from 'react';
import user from '../../images/user.png';
import movie from '../../images/movie.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import './Header.scss';
import {
    fetchAsyncMovies,
    fetchAsyncShows
} from '../../features/movies/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
export const Header = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const [term, setTerm] = useState('');
    const [result, setResult] = useState([]);
    const navigate = useNavigate();

    const generateSuggestions = async (q) => {
        let results;
        try {
            results = await axios.get(
                `https://openweather-react-api.herokuapp.com/movies?m=${q}`
            );
        } catch (error) {
            console.log(error);
        }
        if (results.data.success) {
            setResult(results.data.data);
        } else {
            setResult([]);
        }
    };

    const debouncedSuggestions = useCallback(
        debounce(generateSuggestions, 250),
        []
    );

    const submitHandler = (e) => {
        e.preventDefault();
        if (term === '') {
            alert('Enter Valid Query');
        } else {
            dispatch(fetchAsyncMovies(term));
            dispatch(fetchAsyncShows(term));
            navigate('/');
        }
        setResult([]);
        setTerm('');
    };
    const clickHandler = (e, q) => {
        if (q === '') {
            alert('Enter Valid Query');
        } else {
            dispatch(fetchAsyncMovies(q));
            dispatch(fetchAsyncShows(q));
            navigate('/');
        }
        setResult([]);
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
                    <div className='input-box'>
                        <input
                            type='text'
                            value={term}
                            placeholder='Search...'
                            onInput={(e) => {
                                setTerm(e.target.value);
                                debouncedSuggestions(e.target.value);
                            }}
                            style={
                                result.length !== 0
                                    ? { borderRadius: '8px 0px 0px 0px' }
                                    : null
                            }
                        />
                        <button
                            type='submit'
                            style={
                                result.length !== 0
                                    ? { borderRadius: '0px 8px 0px 0px' }
                                    : null
                            }
                        >
                            <i className='fa fa-search'></i>
                        </button>
                    </div>
                    {result.length !== 0 && (
                        <div
                            className='dataResult'
                            style={
                                result.length < 2 ? { height: 'auto' } : null
                            }
                        >
                            {result.slice(0, 10).map((value, index) => {
                                return (
                                    <div
                                        className='dataItem'
                                        key={index}
                                    >
                                        <a
                                            href
                                            rel='noreferrer'
                                            className='aClick'
                                            onClick={(e) =>
                                                clickHandler(
                                                    e,
                                                    value.movie_title
                                                )
                                            }
                                        >
                                            <p>{value.movie_title}</p>
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </form>
            </div>
            <Link to={!currentUser ? '/signup' : '/profile'}>
                <div className='user-image'>
                    <img
                        src={user}
                        alt='user'
                    />
                </div>
            </Link>
        </div>
    );
};
