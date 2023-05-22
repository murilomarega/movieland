import moviesSlice from '../data/moviesSlice';
import searchMovieSlice from '../data/searchMovieSlice';
import starredSlice from '../data/starredSlice';
import watchLaterSlice from '../data/watchLaterSlice';

const useActions = () => {
  return {
    moviesActions: { ...moviesSlice.actions },
    starredActions: { ...starredSlice.actions },
    watchLaterActions: { ...watchLaterSlice.actions },
    searchMovieActions: { ...searchMovieSlice.actions },
  };
};

export default useActions;
