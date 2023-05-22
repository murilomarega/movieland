import React, { useEffect } from 'react';
import useActions from '../hooks/useActions';
import useAppState from '../hooks/useAppState';
import { fetchSearchMovies } from '../services/movies.service';

const Search = () => {
  const {
    searchMovie: { searchedTerm, pageSearch },
    dispatch,
  } = useAppState();

  const {
    searchMovieActions: { setSearchedTerm, incrementPage, setIsLoading },
  } = useActions();

  const handleChange = (event) => {
    dispatch(setSearchedTerm(event));
  };

  useEffect(() => {
    if (searchedTerm && searchedTerm !== '') {
      dispatch(fetchSearchMovies({ page: pageSearch, query: searchedTerm }));
      dispatch(setIsLoading(true));
      dispatch(incrementPage());
    }
  }, [searchedTerm]);

  return (
    <input
      type="search"
      data-testid="search-movies"
      value={searchedTerm}
      onChange={(e) => handleChange(e.target.value)}
      className="form-control rounded"
      placeholder="Search movies..."
      aria-label="Search movies"
      aria-describedby="search-addon"
    />
  );
};

export default Search;
