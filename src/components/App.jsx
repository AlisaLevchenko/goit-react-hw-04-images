import { ThreeDots } from 'react-loader-spinner';
import { useState, useEffect } from 'react';

import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import s from 'components/App.module.css';
import api from '../api/api';

export default function App() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = () => {
    return api({ page, query })
      .then(responsePhotos => {
        if (responsePhotos.hits.length === 0) {
          alert('There are no images matching your search query');
        }
        setPhotos(prevState => [...prevState, ...responsePhotos.hits]);
        setShowLoadMore(true);
        if (responsePhotos.totalHits <= 12) {
          setShowLoadMore(false);
        }
        if (page === Math.ceil(responsePhotos.totalHits / 12)) {
          setShowLoadMore(false);
        }
      })
      .catch(error => {
        throw error;
      })
      .finally(() => setLoading(false));
  };

  const handleFormSubmit = query => {
    setQuery(query);
  };

  useEffect(() => {
    if (query === '') return;
    setLoading(true);
    setShowLoadMore(false);
    setPhotos([]);
    fetchPhotos();
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    if (page === 1) return;
    setLoading(true);
    setShowLoadMore(false);
    fetchPhotos();
    // eslint-disable-next-line
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery photos={photos} />
      {loading && (
        <div className={s.dots}>
          <ThreeDots
            color="#5d8aa8"
            height={100}
            width={100}
            ariaLabel="three-dots-loading"
          />
        </div>
      )}

      {showLoadMore && <Button onFetch={handleLoadMore} />}
    </div>
  );
}
