import AsyncStorage from '@react-native-async-storage/async-storage';

// Key for storing favorite movies
const FAVORITES_KEY = 'favorite_movies';

// Function to initialize the storage
export const getFavorites = async () => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return favorites != null ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

// Function to add a movie to favorites
export const addFavorite = async (movie) => {
  try {
    const favorites = await getFavorites();
    const newFavorites = [...favorites, movie];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    return true;
  } catch (e) {
    console.error('Failed to add favorite', e);
    return false;
  }
};

// Function to remove a movie from favorites
export const removeFavorite = async (movieId) => {
  try {
    const favorites = await getFavorites();
    const newFavorites = favorites.filter(movie => movie.imdbID !== movieId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    return true;
  } catch (e) {
    console.error('Failed to remove favorite', e);
    return false;
  }
};

// Function to check if a movie is in favorites
export const isFavorite = async (movieId) => {
  try {
    const favorites = await getFavorites();
    return favorites.some(movie => movie.imdbID === movieId);
  } catch (e) {
    console.error('Failed to check favorite', e);
    return false;
  }
};