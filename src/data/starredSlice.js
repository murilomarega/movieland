import { createSlice } from '@reduxjs/toolkit';

const starredSlice = createSlice({
  name: 'starred',
  initialState: {
    starredMovies: [],
  },
  reducers: {
    starMovie: (state, { payload }) => {
      state.starredMovies = [payload, ...state.starredMovies];
    },
    unstarMovie: (state, { payload }) => {
      state.starredMovies = state.starredMovies.filter(
        (movie) => movie.id !== payload.id
      );
    },
    clearAllStarred: (state) => {
      state.starredMovies = [];
    },
  },
});

export default starredSlice;
