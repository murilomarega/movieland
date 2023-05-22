import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchMovies } from '../services/movies.service';
import { removeDuplicated } from '../utils/removeDuplicated';

const searchMovieSlice = createSlice({
  name: 'searchMovie',
  initialState: {
    movies: [],
    pageSearch: 1,
    searchedTerm: '',
    isLoading: false,
    isLoadingInfinite: false,
    error: null,
  },
  reducers: {
    setSearchedTerm: (state, { payload }) => {
      state.searchedTerm = payload;
      state.movies = [];
      state.pageSearch = 1;
    },
    incrementPage: (state) => {
      state.pageSearch = state.pageSearch + 1;
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
      .addCase(fetchSearchMovies.fulfilled, (state, { payload }) => {
        state.movies = removeDuplicated(state.movies, payload.results);
        state.isLoading = false;
        state.isLoadingInfinite = false;
      })
      .addCase(fetchSearchMovies.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchSearchMovies.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = true;
        state.isLoadingInfinite = false;
      });
  },
});

export default searchMovieSlice;
