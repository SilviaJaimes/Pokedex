// screens/HomeScreen.js (actualizado con ordenamiento)
import { View, FlatList, StyleSheet, ActivityIndicator, Text, RefreshControl, SafeAreaView, Dimensions } from "react-native"
import { usePokemon } from "../context/PokemonContext"
import PokemonCard from "../components/PokemonCard"
import SearchBar from "../components/SearchBar"
import TypeFilter from "../components/TypeFilter"
import SortOptions from "../components/SortOption"

const { width } = Dimensions.get("window")

const HomeScreen = ({ navigation }) => {
  const {
    filteredPokemons,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    types,
    selectedTypes,
    toggleTypeFilter,
    clearTypeFilters,
    sortOption,
    setSortOption,
  } = usePokemon()

  const handlePokemonPress = (pokemon) => {
    navigation.navigate("PokemonDetail", {
      id: pokemon.id,
      name: pokemon.name,
    })
  }

  const renderItem = ({ item, index }) => (
    <PokemonCard 
      pokemon={item} 
      onPress={() => handlePokemonPress(item)} 
      index={index}
    />
  )

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
      </View>
      
      <SearchBar value={searchTerm} onChangeText={setSearchTerm} onClear={() => setSearchTerm("")} />

      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Filtrar por tipo</Text>
        <TypeFilter
          types={types}
          selectedTypes={selectedTypes}
          onToggleType={toggleTypeFilter}
          onClearFilters={clearTypeFilters}
        />
      </View>
      
      <SortOptions onSort={setSortOption} currentSort={sortOption} />

      {filteredPokemons.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No se encontraron Pokémon con los filtros actuales</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPokemons}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={loading} colors={["#f4511e"]} tintColor="#f4511e" />}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  filterSection: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginHorizontal: 20,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: "space-evenly",
    marginBottom: 16,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
})

export default HomeScreen