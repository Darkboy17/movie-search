// This file contains the configuration for the OMDB API.
let API_KEY;

// Check for the environment variable for the API key
if (process.env.EXPO_PUBLIC_OMDB_API_KEY) {
  // For Expo (mobile) - using new .env variable prefix
  API_KEY = process.env.EXPO_PUBLIC_OMDB_API_KEY;
} else if (typeof process !== 'undefined' && process.env.REACT_APP_OMDB_API_KEY) {
  // For React Native CLI/CRA/web
  API_KEY = process.env.REACT_APP_OMDB_API_KEY;
}

// Check if API_KEY is set
if (!API_KEY) {
  console.warn('OMDB API key not found in environment variables');
  // You can set a fallback key here if needed (not recommended for production)
  // API_KEY = 'demo'; // Uncomment for testing only
}

// Export the API configuration
// This allows you to import it in other parts of your application
export const API_CONFIG = {
  BASE_URL: 'https://www.omdbapi.com/',
  API_KEY
};