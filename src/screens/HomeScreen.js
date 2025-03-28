import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { searchMovies } from '../utils/api';
import { getFavorites, addFavorite, removeFavorite, isFavorite } from '../utils/storage';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { useIsFocused } from '@react-navigation/native';

// This screen allows users to search for movies and view the results in a list format. It also provides functionality to add or remove movies from the favorites list. The screen uses a search bar for user input and displays loading indicators while fetching data.
// The FlatList component is used to render the list of movies, and the MovieCard component is used to display individual movie details. The screen also handles pagination for loading more results when the user scrolls down.
export default function HomeScreen() {

  // Import necessary components and hooks from React and React Native
  // Import utility functions for API calls and local storage management
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false); // New state for search loading
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const isFocused = useIsFocused();

  // Function to handle the search input and fetch movies based on the query
  // The useEffect hook is used to perform side effects in function components
  useEffect(() => {
    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);

  // Load favorites when the component mounts or when the screen is focused
  // The loadFavorites function fetches the list of favorite movies from local storage
  useEffect(() => {
    loadFavorites();
  }, []);

  // Function to load favorites from local storage
  // It uses the getFavorites function to retrieve the list of favorite movies
  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  // Function to handle the search input and fetch movies based on the query
  // It uses the searchMovies function to fetch movies from the API based on the search query and page number
  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setQuery(searchQuery);
    setSearchLoading(true); // Set search loading to true
    setPage(1);

    const result = await searchMovies(searchQuery, 1);
    setMovies(result.Search || []);
    setTotalResults(parseInt(result.totalResults) || 0);
    setHasMore(result.Search?.length > 0 && result.Search.length < parseInt(result.totalResults));
    setSearchLoading(false); // Set search loading to false when done
  };

  // Function to load more movies when the user scrolls down
  // It checks if there are more results to load and fetches the next page of movies
  const loadMore = async () => {
    if (movies.length >= totalResults) {
      setHasMore(false);
      return;
    }

    setLoading(true);
    const nextPage = page + 1;
    const result = await searchMovies(query, nextPage);

    if (result.Search) {
      setMovies([...movies, ...result.Search]);
      setPage(nextPage);
      setHasMore(movies.length + result.Search.length < parseInt(result.totalResults));
    }
    setLoading(false);
  };

  // Function to handle the favorite button press
  // It toggles the favorite status of the movie and updates local storage accordingly
  const handleFavoritePress = async (movie) => {
    const isFav = await isFavorite(movie.imdbID);
    if (isFav) {
      await removeFavorite(movie.imdbID);
    } else {
      await addFavorite(movie);
    }
    loadFavorites();
  };

  // Function to render the footer of the FlatList
  // It displays a "Load More" button if there are more movies to load
  const renderFooter = () => {
    if (!hasMore) return null;

    return (
      <TouchableOpacity
        style={styles.loadMoreButton}
        onPress={loadMore}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.loadMoreText}>Load More Movies</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <SearchBar onSearch={handleSearch} />

      {/* Show loading spinner when searching */}
      {searchLoading ? (
        <View style={styles.centeredLoading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : movies.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Search for movies to see results</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => navigation.navigate('MovieDetail', { movieId: item.imdbID })}
              isFavorite={favorites.some(fav => fav.imdbID === item.imdbID)}
              onFavoritePress={() => handleFavoritePress(item)}
            />
          )}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
}

// Styles for the components in the HomeScreen
// The styles are defined using the StyleSheet API from React Native
const styles = StyleSheet.create({
  loadMoreButton: {
    backgroundColor: '#2c3e50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  loadMoreText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centeredLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});