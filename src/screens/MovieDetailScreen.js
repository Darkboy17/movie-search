import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getMovieDetails } from '../utils/api';
import { addFavorite, removeFavorite, isFavorite } from '../utils/storage';

// This screen displays the details of a selected movie, including its title, poster, ratings, and other information. It also allows users to add or remove the movie from their favorites list.
// The screen fetches movie details from an API and manages the favorite status using local storage.
export default function MovieDetailScreen({ route }) {

  // Extract the movieId from the route parameters
  // Initialize state variables for movie details, loading status, and favorite status
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);

  // Fetch movie details and favorite status when the component mounts or when movieId changes
  // The useEffect hook is used to perform side effects in function components
  useEffect(() => {
    const fetchData = async () => {
      const details = await getMovieDetails(movieId);
      setMovie(details);
      setLoading(false);

      const favoriteStatus = await isFavorite(movieId);
      setIsFav(favoriteStatus);
    };

    fetchData();
  }, [movieId]);

  // Function to handle the favorite button press
  // It toggles the favorite status of the movie and updates local storage accordingly
  const handleFavoritePress = async () => {
    if (isFav) {
      await removeFavorite(movieId);
    } else {
      await addFavorite({
        imdbID: movieId,
        Title: movie.Title,
        Poster: movie.Poster,
        Year: movie.Year
      });
    }
    setIsFav(!isFav);
  };

  // Render loading indicator while fetching data
  // If the movie is not found, display a message
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If the movie is not found, display a message
  // This can happen if the movieId is invalid or the API returns no data
  if (!movie) {
    return (
      <View style={styles.container}>
        <Text>Movie not found</Text>
      </View>
    );
  }

  // Function to render a detail section if the value exists
  const renderDetailSection = (title, value) => {
    if (!value || value === 'N/A') return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.detailText}>{value}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster' }}
          style={styles.poster}
        />
        <View style={styles.headerDetails}>
          <Text style={styles.title}>{movie.Title}</Text>
          <Text style={styles.meta}>{movie.Year} • {movie.Rated} • {movie.Runtime}</Text>
          <Text style={styles.genre}>{movie.Genre}</Text>

          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{movie.imdbRating}/10</Text>
            <Text style={styles.votes}>({movie.imdbVotes} votes)</Text>
          </View>

          {movie.Metascore && movie.Metascore !== 'N/A' && (
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star-half" size={20} color="#FFA500" />
              <Text style={styles.rating}>Metascore: {movie.Metascore}/100</Text>
            </View>
          )}

          <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
            <MaterialIcons
              name={isFav ? 'favorite' : 'favorite-border'}
              size={30}
              color={isFav ? 'red' : '#333'}
            />
            <Text style={styles.favoriteText}>
              {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderDetailSection('Plot', movie.Plot)}
      {renderDetailSection('Director', movie.Director)}
      {renderDetailSection('Writers', movie.Writer)}
      {renderDetailSection('Cast', movie.Actors)}
      {renderDetailSection('Awards', movie.Awards)}
      {renderDetailSection('Language', movie.Language)}
      {renderDetailSection('Country', movie.Country)}
      {renderDetailSection('Box Office', movie.BoxOffice)}
      {renderDetailSection('Production', movie.Production)}
      {renderDetailSection('Website', movie.Website)}
      {renderDetailSection('DVD Release', movie.DVD)}
      {renderDetailSection('Released', movie.Released)}
      {renderDetailSection('Type', movie.Type)}

      {/* Display all ratings */}
      {movie.Ratings && movie.Ratings.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ratings</Text>
          {movie.Ratings.map((rating, index) => (
            <View key={index} style={styles.ratingItem}>
              <Text style={styles.ratingSource}>{rating.Source}:</Text>
              <Text style={styles.ratingValue}>{rating.Value}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

// Styles for the MovieDetailScreen component
// The styles are defined using the StyleSheet API from React Native
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 5,
  },
  headerDetails: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  meta: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  genre: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rating: {
    marginLeft: 5,
    marginRight: 10,
    fontWeight: 'bold',
  },
  votes: {
    fontSize: 12,
    color: '#666',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  favoriteText: {
    marginLeft: 10,
    color: '#333',
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  plot: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
  detailText: {
    fontSize: 14,
    color: '#444',
  },
  ratingItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  ratingSource: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  ratingValue: {
    color: '#666',
  },
});