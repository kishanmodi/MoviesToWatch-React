import React from 'react';
import { settings } from '../../common/settings';
import { useSelector } from 'react-redux';
import { MovieCard } from '../MovieCard/MovieCard';
import {
    getRecommendedMovies,
    getLoading
} from '../../features/movies/movieSlice';
import '../MovieListing/MovieListing.scss';
import Slider from 'react-slick';
export const RecommendList = () => {
    const rcmd = useSelector(getRecommendedMovies);
    const loading = useSelector(getLoading);
    let renderMovies =
        rcmd.length !== 0 ? (
            rcmd.map((movie, index) => (
                <MovieCard
                    key={index}
                    data={movie}
                />
            ))
        ) : (
            <div className='loading'>
                <h4>error</h4>
            </div>
        );
    return (
        <div className='recommend-section'>
            <div className='recommend-header'>
                <h3>Recommendations</h3>
            </div>
            {loading ? (
                <div className='loading'>
                    <h4>Loading...</h4>
                </div>
            ) : (
                <div className='movie-list'>
                    <div className='movie-container'>
                        <Slider {...settings}>{renderMovies}</Slider>
                    </div>
                </div>
            )}
        </div>
    );
};
