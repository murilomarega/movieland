import { useEffect, useState } from 'react';

const usePortal = (portalName) => {
  const [portal, setPortal] = useState();

  useEffect(() => {
    setPortal(document.querySelector(`.portal-${portalName}`));
  }, [portalName]);

  return portal;
};

export { usePortal };
