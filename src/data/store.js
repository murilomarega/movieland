import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './moviesSlice';
import searchMovieSlice from './searchMovieSlice';
import starredSlice from './starredSlice';
import watchLaterSlice from './watchLaterSlice';

const getInitialState = () => {
  const storedState = localStorage.getItem('movieland');
  return storedState ? JSON.parse(storedState) : undefined;
};

const localstorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState();

  if (!action.type.startsWith('movies/')) {
    const stateToPersist = {
      starred: state.starred,
      watchLater: state.watchLater,
      searchMovie: state.searchMovie,
    };

    localStorage.setItem('movieland', JSON.stringify(stateToPersist));
  }

  return result;
};

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    starred: starredSlice.reducer,
    watchLater: watchLaterSlice.reducer,
    searchMovie: searchMovieSlice.reducer,
  },
  preloadedState: getInitialState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localstorageMiddleware),
});

export default store;
