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
    fetchAsyncShows,
    removeResults,
    setResults
} from '../../features/movies/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
export const Header = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const [term, setTerm] = useState('');
    const results = useSelector((state) => state.movies.results);
    const inputDisabled = useSelector((state) => state.movies.inputDisabled);
    const navigate = useNavigate();
    const [temp, setTemp] = useState([]);
    useEffect(() => {
        dispatch(setResults(temp));
        return () => {
            dispatch(removeResults());
        };
    }, [dispatch, temp]);

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
            setTemp(results.data.data);
        } else {
            setTemp([]);
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
        setTemp([]);
        setTerm('');
    };
    const clickHandler = (e, q) => {
        if (q === '') {
        } else {
            dispatch(fetchAsyncMovies(q));
            dispatch(fetchAsyncShows(q));
            navigate('/');
        }
        setTemp([]);
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
                    <div
                        className='input-box'
                        style={inputDisabled ? { display: 'none' } : null}
                    >
                        <input
                            type='text'
                            value={term}
                            placeholder='Search...'
                            onInput={(e) => {
                                setTerm(e.target.value);
                                debouncedSuggestions(e.target.value);
                            }}
                            style={
                                results.length !== 0
                                    ? { borderRadius: '8px 0px 0px 0px' }
                                    : null
                            }
                        />
                        <button
                            disabled={term.length !== 0 ? false : true}
                            type='submit'
                            style={
                                results.length !== 0
                                    ? { borderRadius: '0px 8px 0px 0px' }
                                    : null
                            }
                        >
                            <i className='fa fa-search'></i>
                        </button>
                    </div>
                    {results.length !== 0 && (
                        <div
                            className='dataResult'
                            style={
                                results.length < 2 ? { height: 'auto' } : null
                            }
                        >
                            {results.slice(0, 10).map((value, index) => {
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
