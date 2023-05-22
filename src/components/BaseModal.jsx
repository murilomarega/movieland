import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { usePortal } from '../hooks/usePortal';
import '../styles/base-modal.scss';

const BaseModal = ({ isOpen, onClose, children }) => {
  const portal = usePortal('movies');

  const handleOnClose = () => {
    const modal = document.querySelector('.basemodal__container');
    if (!modal) {
      onClose();
      return;
    }

    modal.classList.remove('oppened');
    setTimeout(onClose, 150);
  };

  useEffect(() => {
    const modal = document.querySelector('.basemodal__container');

    if (modal && isOpen) {
      modal.classList.add('oppened');
    }
  });

  if (!portal || !isOpen) return null;

  return ReactDOM.createPortal(
    <div className="basemodal__container" key="basemodal">
      <div
        className="basemodal__backdrop"
        onClick={() => handleOnClose()}
      ></div>
      <div className="basemodal__content">
        <button
          type="button"
          className="btn btn-light"
          aria-label="Close"
          onClick={() => handleOnClose()}
        >
          <i className="bi bi-x"></i>
        </button>
        {children}
      </div>
    </div>,
    portal
  );
};
export default BaseModal;
