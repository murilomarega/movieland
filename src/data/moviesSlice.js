import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies } from '../services/movies.service';
import { removeDuplicated } from '../utils/removeDuplicated';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    isLoading: false,
    isLoadingInfinite: false,
    moviesPage: 1,
    error: null,
  },
  reducers: {
    incrementPage: (state) => {
      state.moviesPage = state.moviesPage + 1;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setIsLoadingInfinite: (state, { payload }) => {
      state.isLoadingInfinite = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, { payload }) => {
        state.movies = removeDuplicated(state.movies, payload.results);
        state.isLoading = false;
        state.isLoadingInfinite = false;
      })
      .addCase(fetchMovies.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchMovies.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isLoadingInfinite = false;
        state.error = payload;
      });
  },
});

export default moviesSlice;
