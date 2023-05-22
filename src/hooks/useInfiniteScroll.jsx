import { useEffect } from 'react';

const useInfiniteScroll = (elementId, page, onScrollHitBootom, setLoading) => {
  const handleScroll = (e) => {
    if (window.innerHeight + e.target.scrollTop + 1 >= e.target.scrollHeight) {
      onScrollHitBootom(page, true);
      setLoading();
    }
  };

  useEffect(() => {
    if (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.addEventListener('scroll', handleScroll);

        return () => {
          element.removeEventListener('scroll', handleScroll);
        };
      }
    }
  }, [page]);
};

export default useInfiniteScroll;
