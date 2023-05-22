import placeholder from '../assets/not-found-500X750.jpeg';
import useActions from '../hooks/useActions';
import useAppState from '../hooks/useAppState';
import '../styles/movie.scss';

const Movie = ({ movie, viewTrailer }) => {
  const { starred, watchLater, dispatch } = useAppState();

  const {
    starredActions: { starMovie, unstarMovie },
    watchLaterActions: { addToWatchLater, removeFromWatchLater },
  } = useActions();

  const myClickHandler = (e) => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    e.target.parentElement.parentElement.classList.remove('opened');
  };

  const handleAddWatchLater = () => {
    dispatch(addToWatchLater(movie));
  };

  const handleRemoveWatchLater = () => {
    dispatch(removeFromWatchLater(movie));
  };

  const handleStarMovie = () => {
    dispatch(starMovie(movie));
  };

  const handleUnstarmovie = () => {
    dispatch(unstarMovie(movie));
  };

  return (
    <div className="wrapper col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <div
        className="card"
        onClick={(e) => e.currentTarget.classList.add('opened')}
      >
        <div className="card-body">
          <div className="overlay" />
          <div className="info_panel">
            <h6 className="mobile-title">{movie.title}</h6>
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            <div className="buttons-container d-flex flex-column w-100 align-items-center">
              {!starred.starredMovies
                .map((movie) => movie.id)
                .includes(movie.id) ? (
                <span
                  className="btn-star"
                  data-testid="starred-link"
                  onClick={() => handleStarMovie()}
                >
                  <i className="bi bi-star" />
                </span>
              ) : (
                <span
                  className="btn-star"
                  data-testid="unstar-link"
                  onClick={() => handleUnstarmovie()}
                >
                  <i className="bi bi-star-fill" data-testid="star-fill" />
                </span>
              )}
              {!watchLater.watchLaterMovies
                .map((movie) => movie.id)
                .includes(movie.id) ? (
                <button
                  type="button"
                  data-testid="watch-later"
                  className="btn btn-light btn-watch-later"
                  onClick={() => handleAddWatchLater()}
                >
                  Watch Later
                </button>
              ) : (
                <button
                  type="button"
                  data-testid="remove-watch-later"
                  className="btn btn-light btn-watch-later blue"
                  onClick={() => handleRemoveWatchLater()}
                >
                  <i className="bi bi-check"></i>
                </button>
              )}
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => viewTrailer()}
              >
                View Trailer
              </button>
            </div>
          </div>
          <img
            className="center-block"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : placeholder
            }
            alt="Movie poster"
          />
        </div>
        <h6 className="title">{movie.title}</h6>
        <button
          type="button"
          className="close"
          onClick={(e) => myClickHandler(e)}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Movie;
