import React, { useEffect } from 'react';
import { MovieListing } from '../MovieListing/MovieListing';

import { useDispatch } from 'react-redux';
import {
    fetchAsyncMovies,
    fetchAsyncShows
} from '../../features/movies/movieSlice';
export const Home = () => {
    const dispatch = useDispatch();
    const movieText = 'BatMan';
    const showText = 'Dark';
    useEffect(() => {
        dispatch(fetchAsyncMovies(movieText));
        dispatch(fetchAsyncShows(showText));
    }, [dispatch]);
    return (
        <div>
            <div className='banner-img'></div>
            <MovieListing />
        </div>
    );
};
