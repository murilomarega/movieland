import { Link } from 'react-router-dom';
import Movies from '../components/Movies';
import useActions from '../hooks/useActions';
import useAppState from '../hooks/useAppState';
import '../styles/pages.scss';

const WatchLater = () => {
  const {
    watchLater: { watchLaterMovies },
    dispatch,
  } = useAppState();

  const {
    watchLaterActions: { removeAllWatchLater },
  } = useActions();

  return (
    <div className="starred mt-5" data-testid="watch-later-div">
      <h6 className="fs-1 mb-5">Watch Later List</h6>

      {!!watchLaterMovies.length ? (
        <>
          <Movies movies={watchLaterMovies} />

          <footer className="text-center">
            <button
              className="btn btn-primary btn-remove"
              onClick={() => dispatch(removeAllWatchLater())}
            >
              Remove all watch later
            </button>
          </footer>
        </>
      ) : (
        <div className="text-center empty-cart">
          <i className="bi bi-heart icon-white" />
          <p>You have no movies saved to watch later.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchLater;
