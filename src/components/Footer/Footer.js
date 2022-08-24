import React from 'react';
import './Footer.scss';
export const Footer = () => {
    return (
        <div className='footer'>
            <div>MovieToWatch</div>
            <div>
                Made with{' '}
                <i
                    className='fa fa-heart'
                    style={{ color: 'red' }}
                />
                {'   '}
                by <a href='https://www.github.com/kishanmodi'>Kishan</a>
            </div>
        </div>
    );
};
