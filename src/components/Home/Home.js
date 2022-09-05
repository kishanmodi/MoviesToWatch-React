import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MovieListing } from '../MovieListing/MovieListing';
import {
    removeResults,
    inputOn,
    inputOff
} from '../../features/movies/movieSlice';
export const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(inputOn());
        return () => {
            dispatch(removeResults());
            dispatch(inputOff());
        };
    });
    return (
        <div>
            <MovieListing />
        </div>
    );
};
