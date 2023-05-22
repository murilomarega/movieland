import { Link } from 'react-router-dom';
import Movies from '../components/Movies';
import useActions from '../hooks/useActions';
import useAppState from '../hooks/useAppState';
import '../styles/pages.scss';

const Starred = () => {
  const {
    starred: { starredMovies },
    dispatch,
  } = useAppState();

  const {
    starredActions: { clearAllStarred },
  } = useActions();

  return (
    <div className="starred container mt-5" data-testid="starred-container">
      <h6 className="fs-1 mb-5">Starred movies</h6>
      {!!starredMovies.length ? (
        <>
          <Movies movies={starredMovies} />

          <footer className="text-center">
            <button
              className="btn btn-primary btn-remove"
              onClick={() => dispatch(clearAllStarred())}
            >
              Remove all starred
            </button>
          </footer>
        </>
      ) : (
        <div className="text-center empty-cart">
          <i className="bi bi-star icon-white" />
          <p>There are no starred movies.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Starred;
