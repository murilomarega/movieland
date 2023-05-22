import { Loading } from '../components/Loading';
import Movies from '../components/Movies';
import useActions from '../hooks/useActions';
import useAppState from '../hooks/useAppState';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { fetchSearchMovies } from '../services/movies.service';
import '../styles/pages.scss';

const Search = () => {
  const {
    searchMovie: {
      movies,
      pageSearch,
      searchedTerm,
      isLoading,
      isLoadingInfinite,
    },
    dispatch,
  } = useAppState();

  const {
    searchMovieActions: { incrementPage, setIsLoadingInfinite },
  } = useActions();

  const getMovies = (page) => {
    dispatch(fetchSearchMovies({ page, query: searchedTerm }));
    dispatch(incrementPage());
  };

  const setLoadingInfinite = () => {
    dispatch(setIsLoadingInfinite(true));
  };

  useInfiniteScroll('root', pageSearch, getMovies, setLoadingInfinite);

  return (
    <div className="starred container mt-5" data-testid="suggested-container">
      <h6 className="fs-1 mb-5">Searched movies</h6>
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
              <i className="bi bi-search" />
              <p>There are no movies found with: {searchedTerm}.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
