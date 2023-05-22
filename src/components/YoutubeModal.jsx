import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '../services/movies.service';
import '../styles/youtube-modal.scss';
import BaseModal from './BaseModal';
import { Loading } from './Loading';
import YoutubePlayer from './YoutubePlayer';

const YoutubeModal = ({ movieId, isOpen, onClose }) => {
  const [videoKey, setVideoKey] = useState('');
  const [loading, setLoading] = useState(false);

  const getMovie = async () => {
    setLoading(true);
    setVideoKey(null);

    const videoData = await getMovieDetails({ movieId: movieId });
    setLoading(false);

    if (videoData?.videos && videoData?.videos?.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === 'Trailer'
      );
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  useEffect(() => {
    getMovie();
  }, [movieId]);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="youtube-modal__content">
        {loading ? (
          <div className="youtube-loading h-100 w-100 d-flex align-items-center justify-content-center">
            <Loading />
          </div>
        ) : (
          <>
            {videoKey ? (
              <div className="modal-content-container p-0">
                <YoutubePlayer videoKey={videoKey} />
              </div>
            ) : (
              <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                <h6>no trailer available. Try another movie</h6>
              </div>
            )}
          </>
        )}
      </div>
    </BaseModal>
  );
};

export default YoutubeModal;
