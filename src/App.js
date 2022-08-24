import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MovieDetails } from './components/MovieDetails/MovieDetails';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
function App() {
    return (
        <div className='app'>
            <Router>
                <Header></Header>
                <div className='container'>
                    <Routes>
                        <Route
                            path='/'
                            element={<Home />}
                        />
                        <Route
                            path='/movie/:imdbID'
                            element={<MovieDetails />}
                        />
                        <Route
                            path='*'
                            element={<PageNotFound />}
                        />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
