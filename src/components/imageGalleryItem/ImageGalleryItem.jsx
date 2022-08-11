import Modal from '../modal/Modal';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import { useState } from 'react';

export default function ImageGalleryItem(props) {
  const [showModal, setShowModal] = useState(false);

  const onOpenModal = () => {
    setShowModal(true);
  };
  const onCloseModal = () => {
    setShowModal(false);
  };

  const { webformatURL, largeImageURL } = props;
  return (
    <div>
      <li>
        <img
          className={s.imageGalleryItemImage}
          src={webformatURL}
          alt=""
          onClick={onOpenModal}
        />
      </li>
      {showModal && <Modal src={largeImageURL} onClose={onCloseModal} />}
    </div>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
