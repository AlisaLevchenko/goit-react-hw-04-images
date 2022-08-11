const API_KEY = '29075157-7bb5c5ac82b024e7bc90995e8';

export default function api({ page, query }) {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Oops, there is no photos with that name');
    }
    return response.json();
  });
}
