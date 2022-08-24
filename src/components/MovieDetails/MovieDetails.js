import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RecommendList } from './RecommendList';
import './MovieDetails.scss';

import {
    fetchAsyncMovieOrShowDetails,
    getSelectedMovieOrShowDetails,
    removeSelectedMoviesOrShows,
    fetchAsyncRecommedation,
    removeRecommended,
    fetchAsyncProviders,
    getProviders,
    getLoadingProvider,
    removeProviders
} from '../../features/movies/movieSlice';

export const MovieDetails = () => {
    const { imdbID } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(getSelectedMovieOrShowDetails);
    const providers = useSelector(getProviders);
    console.log(providers);

    const loadingProvider = useSelector(getLoadingProvider);
    useEffect(() => {
        dispatch(fetchAsyncProviders(imdbID));
        dispatch(fetchAsyncMovieOrShowDetails(imdbID));
        dispatch(fetchAsyncRecommedation(imdbID));
        return () => {
            dispatch(removeSelectedMoviesOrShows());
            dispatch(removeRecommended());
            dispatch(removeProviders());
        };
    }, [dispatch, imdbID]);

    return (
        <>
            <div className='movie-section'>
                {Object.keys(data).length === 0 ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div className='section-left'>
                            <div className='movie-title'>{data.Title}</div>
                            <div className='movie-rating'>
                                <span>
                                    IMDB Rating <i className='fa fa-star'></i>:{' '}
                                    {data.imdbRating}
                                </span>
                                <span>
                                    IMDB Votes{' '}
                                    <i className='fa fa-thumbs-up'></i>:{' '}
                                    {data.imdbVotes}
                                </span>

                                <span>
                                    Runtime <i className='fa fa-film'></i>:{' '}
                                    {data.Runtime}
                                </span>
                                <span>
                                    Year <i className='fa fa-calendar'></i>:{' '}
                                    {data.Year}
                                </span>
                            </div>
                            <div className='movie-plot'>{data.Plot}</div>
                            <div className='info-box'>
                                <div className='movie-info'>
                                    <div>
                                        <span>Director </span>
                                        <span>{data.Director}</span>
                                    </div>
                                    <div>
                                        <span>Stars </span>
                                        <span>{data.Actors}</span>
                                    </div>
                                    <div>
                                        <span>Genres </span>
                                        <span>{data.Genre}</span>
                                    </div>
                                    <div>
                                        <span>Languages </span>
                                        <span>{data.Language}</span>
                                    </div>
                                    <div>
                                        <span>Awards </span>
                                        <span>{data.Awards}</span>
                                    </div>
                                </div>
                                {loadingProvider
                                    ? console.log(providers)
                                    : null}
                                {loadingProvider ? (
                                    <div className='provider-box'>
                                        {providers.youtube_link !== 'None' ||
                                        providers.ott_link !== '' ? (
                                            <div className='stream'>
                                                Stream On:{' '}
                                            </div>
                                        ) : null}
                                        {providers.youtube_link !== 'None' ? (
                                            <div className='youtube'>
                                                <a
                                                    href={
                                                        providers.youtube_link
                                                    }
                                                    target='_blank'
                                                    rel='noreferrer'
                                                >
                                                    <i className='fa-brands fa-youtube fa-3x'></i>
                                                </a>
                                            </div>
                                        ) : null}
                                        {providers.ott_link !== '' ? (
                                            <div className='ott'>
                                                <a
                                                    href={providers.ott_link}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                >
                                                    <img
                                                        src={providers.ott_logo}
                                                        alt='ott'
                                                    />
                                                </a>
                                            </div>
                                        ) : null}
                                    </div>
                                ) : (
                                    <>Error</>
                                )}
                            </div>
                        </div>
                        <div className='section-right'>
                            <img
                                src={data.Poster}
                                alt={data.Title}
                            />
                        </div>
                    </>
                )}
            </div>
            <RecommendList />
        </>
    );
};
