import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from '../../common/apis/movieApi';
import { apiKey } from '../../common/apis/MovieAPIKey';
import axios from 'axios';

export const fetchAsyncMovies = createAsyncThunk(
    'movies/fecthAsyncMovies',
    async (term) => {
        const response = await movieApi
            .get(`?apiKey=${apiKey}&s=${term}&type=movie`)
            .catch((err) => {
                console.log(err);
            });
        return response.data;
    }
);
export const fetchAsyncProviders = createAsyncThunk(
    'movies/fetchAsyncProviders',
    async (id) => {
        const response = await axios
            .get(`https://get-rcmd.herokuapp.com/provider/?id=${id}`)
            .catch((err) => {
                console.log(err);
            });
        return response.data;
    }
);
export const fetchAsyncShows = createAsyncThunk(
    'movies/fecthAsyncShows',
    async (term) => {
        const response = await movieApi
            .get(`?apiKey=${apiKey}&s=${term}&type=series`)
            .catch((err) => {
                console.log(err);
            });
        return response.data;
    }
);
export const fetchAsyncMovieOrShowDetails = createAsyncThunk(
    'movies/fetchAsyncMovieOrShowDetails',
    async (id) => {
        const response = await movieApi
            .get(`?apiKey=${apiKey}&i=${id}&Plot=full`)
            .catch((err) => {
                console.log(err);
            });
        return response.data;
    }
);
export const fetchAsyncRecommedation = createAsyncThunk(
    'movies/fetchAsyncRecommedation',
    async (id) => {
        const imdbRes = await axios
            .get(`https://get-rcmd.herokuapp.com/recommend/?id=${id}`)
            .catch((err) => {
                console.log(err);
            });
        const data = await Promise.all(
            imdbRes.data.recommendation.map(async (item) => {
                return axios
                    .get(
                        `https://www.omdbapi.com/?apiKey=6524405e&i=${item.imdb_id}&type=movie`
                    )
                    .then((res) => res.data);
            })
        );
        return data;
    }
);

//! initial state
const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow: {},
    selectedMovieRecommendation: [],
    providers: {},
    loadingProvider: false,
    loading: false
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        removeSelectedMoviesOrShows: (state) => {
            state.selectedMovieOrShow = {};
        },
        removeRecommended: (state) => {
            state.selectedMovieRecommendation = [];
        },
        removeProviders: (state) => {
            state.loadingProvider = false;
        }
    },
    extraReducers: {
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            return { ...state, movies: payload };
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            return { ...state, shows: payload };
        },
        [fetchAsyncMovieOrShowDetails.fulfilled]: (state, { payload }) => {
            return { ...state, selectedMovieOrShow: payload };
        },
        [fetchAsyncRecommedation.pending]: (state) => {
            return { ...state, loading: true };
        },
        [fetchAsyncRecommedation.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                selectedMovieRecommendation: payload
            };
        },
        [fetchAsyncRecommedation.rejected]: (state) => {
            return {
                ...state,
                loading: true,
                selectedMovieRecommendation: []
            };
        },
        [fetchAsyncProviders.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                providers: payload,
                loadingProvider: true
            };
        }
    }
});

// * normal reducers for clean up functions
export const {
    removeSelectedMoviesOrShows,
    removeRecommended,
    removeProviders
} = movieSlice.actions;

// * selector functions that provide access to the store's states
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShowDetails = (state) =>
    state.movies.selectedMovieOrShow;
export const getRecommendedMovies = (state) =>
    state.movies.selectedMovieRecommendation;
export const getProviders = (state) => state.movies.providers;
export const getLoading = (state) => state.movies.loading;
export const getLoadingProvider = (state) => state.movies.loadingProvider;

// * exported the movie reducer function
export default movieSlice.reducer;
