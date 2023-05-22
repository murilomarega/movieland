import { useDispatch, useSelector } from 'react-redux';

const useAppState = () => {
  const { movies, searchMovie, starred, watchLater } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();

  return { movies, starred, watchLater, searchMovie, dispatch };
};

export default useAppState;
