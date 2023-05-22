import { Link, NavLink } from 'react-router-dom';

import useAppState from '../hooks/useAppState';
import '../styles/header.scss';
import Search from './Search';

const Header = () => {
  const {
    starred: { starredMovies },
  } = useAppState();

  return (
    <header>
      <div className="container">
        <Link to="/" data-testid="home">
          <i className="bi bi-film" />
        </Link>

        <nav>
          <NavLink
            to="/starred"
            data-testid="nav-starred"
            className="nav-starred"
          >
            {!!starredMovies?.length ? (
              <>
                <i className="bi bi-star-fill bi-star-fill-white" />
                <sup className="star-number">{starredMovies.length}</sup>
              </>
            ) : (
              <i className="bi bi-star" />
            )}
          </NavLink>
          <NavLink to="/watch-later" className="nav-fav">
            watch later
          </NavLink>
        </nav>

        <div className="input-group rounded">
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
