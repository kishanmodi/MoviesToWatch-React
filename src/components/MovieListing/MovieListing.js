import React from 'react';
import Slider from 'react-slick';

import './MovieListing.scss';
import { useSelector } from 'react-redux';
import { getAllMovies, getAllShows } from '../../features/movies/movieSlice';
import { MovieCard } from '../MovieCard/MovieCard';
import { settings } from '../../common/settings';
export const MovieListing = () => {
    const movies = useSelector(getAllMovies);
    const shows = useSelector(getAllShows);
    console.log(movies);
    let renderMovies =
        movies.Response === 'True' ? (
            movies.Search.map((movie, index) => (
                <MovieCard
                    key={index}
                    data={movie}
                />
            ))
        ) : (
            <div className='movies-error'>
                <h3>{movies.error}</h3>
            </div>
        );
    let renderShows =
        shows.Response === 'True' ? (
            shows.Search.map((show, index) => (
                <MovieCard
                    key={index}
                    data={show}
                />
            ))
        ) : (
            <div className='movies-error'>
                <h3>{movies.error}</h3>
            </div>
        );
    return (
        <>
            <div className='movie-wrapper'>
                <div className='movie-list'>
                    <h2>Movies</h2>
                    <div className='movie-container'>
                        <Slider {...settings}>{renderMovies}</Slider>
                    </div>
                </div>
                <div className='show-list'>
                    <h2>Shows</h2>
                    <div className='movie-container'>
                        <Slider {...settings}>{renderShows}</Slider>
                    </div>
                </div>
            </div>
        </>
    );
};