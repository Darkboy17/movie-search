import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// This component displays a movie card with the movie's poster, title, year, and a favorite icon.
// It takes in props for the movie data, a function to handle card presses, and a function to handle favorite presses.
export default function MovieCard({ movie, onPress, isFavorite, onFavoritePress }) {
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/100x150?text=No+Poster' }}
        style={styles.poster}
      />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{movie.Title}</Text>
        <Text style={styles.year}>{movie.Year}</Text>
      </View>
      <TouchableOpacity onPress={onFavoritePress}>
        <MaterialIcons
          name={isFavorite ? 'favorite' : 'favorite-border'}
          size={24}
          color={isFavorite ? 'red' : 'gray'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

// Styles for the MovieCard component
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  poster: {
    width: 50,
    height: 75,
    borderRadius: 4,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  year: {
    fontSize: 14,
    color: 'gray',
  },
});