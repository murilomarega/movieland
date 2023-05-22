import { useState } from 'react';
import '../styles/movies.scss';
import Movie from './Movie';
import YoutubeModal from './YoutubeModal';
import { Loading } from './Loading';

const Movies = ({ movies, isLoadingInfinite }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [movieTrailerId, setMovieTrailerId] = useState(null);

  return (
    <>
      <div className="row justify-content-center">
        <>
          {movies?.map((movie) => (
            <Movie
              movie={movie}
              key={movie.id}
              viewTrailer={() => {
                setMovieTrailerId(movie.id);
                setIsOpen(true);
              }}
            />
          ))}
          {isLoadingInfinite && (
            <div className="w-100 d-flex justify-content-center pt-3 pb-5">
              <Loading />
            </div>
          )}
        </>
      </div>
      <YoutubeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        movieId={movieTrailerId}
      />
    </>
  );
};

export default Movies;
