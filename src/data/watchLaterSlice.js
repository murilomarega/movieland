import { createSlice } from '@reduxjs/toolkit';

const watchLaterSlice = createSlice({
  name: 'watch-later',
  initialState: {
    watchLaterMovies: [],
  },
  reducers: {
    addToWatchLater: (state, { payload }) => {
      state.watchLaterMovies = [payload, ...state.watchLaterMovies];
    },
    removeFromWatchLater: (state, { payload }) => {
      state.watchLaterMovies = state.watchLaterMovies.filter(
        (movie) => movie.id !== payload.id
      );
    },
    removeAllWatchLater: (state) => {
      state.watchLaterMovies = [];
    },
  },
});

export default watchLaterSlice;
