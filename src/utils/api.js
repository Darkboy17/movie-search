// This file contains functions to interact with the movie database API.

import axios from 'axios';
import { API_CONFIG } from './config';

// This function searches for movies based on a query string and page number.
// It returns a promise that resolves to the search results or an empty array if an error occurs.
export const searchMovies = async (query, page = 1) => {
  if (!API_CONFIG.API_KEY) {
    throw new Error('API key not configured');
  }

  try {
    const response = await axios.get(API_CONFIG.BASE_URL, {
      params: {
        apikey: API_CONFIG.API_KEY,
        s: query,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { Search: [], totalResults: 0 };
  }
};

// This function fetches the details of a movie based on its ID.
// It returns a promise that resolves to the movie details or null if an error occurs.
export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(API_CONFIG.BASE_URL, {
      params: {
        apikey: API_CONFIG.API_KEY,
        i: id,
        plot: 'full',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Exporting the functions for use in other parts of the app
export default {
  searchMovies,
  getMovieDetails
}; 