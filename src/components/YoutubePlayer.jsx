import ReactPlayer from 'react-player';

const YoutubePlayer = ({ videoKey }) => (
  <ReactPlayer
    url={`https://www.youtube.com/watch?v=${videoKey}`}
    controls={true}
    playing={true}
    data-testid="youtube-player"
  />
);

export default YoutubePlayer;
