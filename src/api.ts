// src/api.ts
import axios from 'axios';
import { Bike } from './types';

const api = axios.create({
  baseURL: 'https://bikeindex.org/api/v3',
});

export const fetchBikeThefts = async (page: number = 1): Promise<Bike[]> => {
  const response = await api.get('/search', {
    params: {
      proximity: 'Munich',
      distance: 100,
      stolenness: 'proximity',
      page,
      per_page: 10,
    },
  });
  return response.data.bikes;
};
