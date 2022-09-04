import React from 'react';
import nf from '../../images/nf.png';
import { Link } from 'react-router-dom';
import './MovieCard.scss';
export const MovieCard = (props) => {
    const { data } = props;
    return (
        <div className='card-item'>
            <Link to={`/movie/${data.imdbID}`}>
                <div className='card-inner'>
                    <div className='card-top'>
                        <img
                            src={data.Poster !== 'N/A' ? data.Poster : nf}
                            alt={data.title}
                            style={
                                data.Poster === 'N/A'
                                    ? {
                                          margin: '0 auto',
                                          marginBottom: 'auto',
                                          marginTop: 'auto'
                                      }
                                    : null
                            }
                        />
                    </div>
                    <div className='card-bottom'>
                        <div className='card-info'>
                            <h4>{data.Title}</h4>
                            <p>{data.Year}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
