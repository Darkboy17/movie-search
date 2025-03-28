import { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { searchMovies } from '../utils/api';
import { getFavorites, addFavorite, removeFavorite, isFavorite } from '../utils/storage';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    setQuery(searchQuery);
    setLoading(true);
    setPage(1);
    
    const result = await searchMovies(searchQuery, 1);
    setMovies(result.Search || []);
    setTotalResults(parseInt(result.totalResults) || 0);
    setLoading(false);
  };

  const loadMore = async () => {
    if (movies.length >= totalResults) return;
    
    setLoading(true);
    const nextPage = page + 1;
    const result = await searchMovies(query, nextPage);
    
    if (result.Search) {
      setMovies([...movies, ...result.Search]);
      setPage(nextPage);
    }
    setLoading(false);
  };

  const handleFavoritePress = async (movie) => {
    const isFav = await isFavorite(movie.imdbID);
    if (isFav) {
      await removeFavorite(movie.imdbID);
    } else {
      await addFavorite(movie);
    }
    loadFavorites();
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <SearchBar onSearch={handleSearch} />
      
      {movies.length === 0 && !loading ? (
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
              onPress={() => navigation.navigate('MovieDetail', { movieId })}
              isFavorite={favorites.some(fav => fav.imdbID === item.imdbID)}
              onFavoritePress={() => handleFavoritePress(item)}
            />
          )}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
}