import './App.scss';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MovieDetails } from './components/MovieDetails/MovieDetails';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { SignUp } from './components/SignUp/SignUp';
import { Login } from './components/Login/Login';
import { Profile } from './components/Profile/Profile';
import { PrivateRoute } from './PrivateRoute';
import { useDispatch } from 'react-redux';
import {
    fetchAsyncMovies,
    fetchAsyncShows
} from './features/movies/movieSlice';
import { Forget } from './components/Forget/Forget';
import { PrivateSignupLogin } from './PrivateSignupLogin';
function App() {
    const dispatch = useDispatch();
    const movieText = 'BatMan';
    const showText = 'Dark';
    useEffect(() => {
        dispatch(fetchAsyncMovies(movieText));
        dispatch(fetchAsyncShows(showText));
    }, [dispatch]);
    return (
        <div className='app'>
            <Router>
                <Header />
                <div className='Container'>
                    <Routes>
                        <Route
                            path='/'
                            exact
                            element={<Home />}
                        />
                        <Route
                            path='*'
                            element={<PageNotFound />}
                        />
                        <Route
                            path='/signup'
                            element={
                                <PrivateSignupLogin>
                                    <SignUp />
                                </PrivateSignupLogin>
                            }
                        />
                        <Route
                            path='/login'
                            element={
                                <PrivateSignupLogin>
                                    <Login />
                                </PrivateSignupLogin>
                            }
                        />
                        <Route
                            path='/profile'
                            element={
                                <PrivateRoute>
                                    <Profile />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/movie/:imdbID'
                            element={<MovieDetails />}
                        />
                        <Route
                            path='/forget'
                            element={<Forget />}
                        />
                    </Routes>
                </div>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
