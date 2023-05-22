import { useEffect } from 'react';
import { Loading } from '../components/Loading';
import Movies from '../components/Movies';
import useActions from '../hooks/useActions';
import useAppState from '../hooks/useAppState';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { fetchMovies } from '../services/movies.service';
import '../styles/pages.scss';

const Suggested = () => {
  const {
    movies: { movies, moviesPage, isLoading, isLoadingInfinite },
    dispatch,
  } = useAppState();

  const {
    moviesActions: { incrementPage, setIsLoading, setIsLoadingInfinite },
  } = useActions();

  const getMovies = (page) => {
    dispatch(fetchMovies({ page }));
    dispatch(incrementPage());
  };

  const setLoadingInfinite = () => {
    dispatch(setIsLoadingInfinite(true));
  };

  useInfiniteScroll('root', moviesPage, getMovies, setLoadingInfinite);

  useEffect(() => {
    if (!Boolean(movies.length)) {
      getMovies(moviesPage);
      dispatch(setIsLoading(true));
    }
  }, [movies]);

  return (
    <div className="starred container mt-5" data-testid="suggested-container">
      <h6 className="fs-1 mb-5">Suggested movies</h6>
      {isLoading ? (
        <div className="d-flex w-100 justify-content-center pt-5">
          <Loading />
        </div>
      ) : (
        <>
          {!!movies?.length ? (
            <div data-testid="starred-movies" className="starred-movies">
              <Movies movies={movies} isLoadingInfinite={isLoadingInfinite} />
            </div>
          ) : (
            <div className="text-center empty-cart">
              <i className="bi bi-star" />
              <p>There are no suggested movies.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Suggested;
