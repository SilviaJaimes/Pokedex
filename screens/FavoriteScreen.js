import { View, FlatList, StyleSheet, Text } from "react-native"
import { useFavorites } from "../context/FavoritesContext"
import PokemonCard from "../components/PokemonCard"
import { Ionicons } from "@expo/vector-icons"

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useFavorites()

  const handlePokemonPress = (pokemon) => {
    navigation.navigate("PokemonDetail", {
      id: pokemon.id,
      name: pokemon.name,
    })
  }

  const renderItem = ({ item }) => <PokemonCard pokemon={item} onPress={() => handlePokemonPress(item)} />

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="heart-outline" size={64} color="#ccc" />
        <Text style={styles.emptyText}>No tienes Pokémon favoritos</Text>
        <Text style={styles.emptySubtext}>Agrega Pokémon a tus favoritos tocando el ícono de corazón</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
    gap: 10
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    maxWidth: "80%",
  },
})

export default FavoritesScreen
