import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '40750466-a9a3b4ee49fa6557c8d09caed';

export const fetchGallary = async () => {
  const params = new URLSearchParams({
    key: KEY,
    page: 1,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  });
  const { data } = await axios.get(`?${params}`);
  return data;
};

export const fetchGallaryByQuery = async (queryParams, page) => {
  const params = new URLSearchParams({
    key: KEY,
    q: queryParams,
    page,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  });
  const { data } = await axios.get(`?${params}`);
  return data;
};
