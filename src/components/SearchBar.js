import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {

  // State to hold the search query
  const [query, setQuery] = useState('');

  // Function to handle search when the user submits the input
  // or presses the search icon
  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search movies..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <Ionicons
        name="search"
        size={24}
        color="gray"
        onPress={handleSearch}
      />
    </View>
  );
}

// Styles for the SearchBar component
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 8,
  },
});