import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import './app.scss';
import Header from './components/Header';
import useAppState from './hooks/useAppState';
import Search from './pages/Search';
import Starred from './pages/Starred';
import Suggested from './pages/Suggested';
import WatchLater from './pages/WatchLater';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    searchMovie: { searchedTerm },
  } = useAppState();

  useEffect(() => {
    if (searchedTerm && !!searchedTerm.length) {
      if (location.pathname !== '/search') {
        navigate('/search');
      }
      return;
    }
    navigate('/');
  }, [searchedTerm]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Suggested />} />
        <Route path="/search" element={<Search />} />
        <Route path="/starred" element={<Starred />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route
          path="*"
          element={<h1 className="not-found">Page Not Found</h1>}
        />
      </Routes>
    </>
  );
};

export default App;
