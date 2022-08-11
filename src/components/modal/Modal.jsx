import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const container = document.getElementById('modal');

export default function Modal({ onClose, src }) {
  const onModalClose = evt => {
    if (evt.code === 'Escape' || evt.currentTarget === evt.target) onClose();
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  return createPortal(
    <div className={s.overlay} onClick={onModalClose}>
      <div className={s.modal}>
        <img src={src} alt="" />
      </div>
    </div>,
    container
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
};
