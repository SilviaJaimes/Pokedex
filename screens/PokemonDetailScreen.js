import { useState, useEffect } from "react"
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useFavorites } from "../context/FavoritesContext"
import TypeBadge from "../components/TypeBadge"
import StatBar from "../components/StatBar"
import EvolutionChain from "../components/EvolutionChain"
import { fetchPokemonDetail, fetchPokemonSpecies, fetchEvolutionChain } from "../Services/api"

const { width } = Dimensions.get("window")

const PokemonDetailScreen = ({ route, navigation }) => {
  const { id, name } = route.params
  const [pokemon, setPokemon] = useState(null)
  const [evolutions, setEvolutions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const favorite = isFavorite(id)

  useEffect(() => {
    const loadPokemonData = async () => {
      try {
        setLoading(true)

        const pokemonData = await fetchPokemonDetail(id || name)
        setPokemon(pokemonData)

        const speciesData = await fetchPokemonSpecies(id || name)
        const evolutionData = await fetchEvolutionChain(speciesData.evolutionChainUrl)
        setEvolutions(evolutionData)
      } catch (err) {
        console.error("Error loading pokemon data:", err)
        setError("Error al cargar los datos del Pokémon")
      } finally {
        setLoading(false)
      }
    }

    loadPokemonData()
  }, [id, name])

  const handleFavoritePress = () => {
    if (favorite) {
      removeFavorite(id)
    } else if (pokemon) {
      addFavorite({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        types: pokemon.types,
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
      })
    }
  }

  const handleEvolutionPress = (evolutionId, evolutionName) => {
    navigation.push("PokemonDetail", {
      id: evolutionId,
      name: evolutionName,
    })
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    )
  }

  if (error || !pokemon) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || "No se pudo cargar la información del Pokémon"}</Text>
      </View>
    )
  }

  // Determinar el color de fondo basado en el primer tipo del Pokémon
  const getTypeColor = (type) => {
    const typeColors = {
      normal: "#A8A878",
      fire: "#FF9C54",
      water: "#4D90D5",
      electric: "#F3D23B",
      grass: "#63BB5B",
      ice: "#74CEC0",
      fighting: "#CE4069",
      poison: "#AB6AC8",
      ground: "#D97746",
      flying: "#8FA8DD",
      psychic: "#F97176",
      bug: "#90C12C",
      rock: "#C7B78B",
      ghost: "#5269AC",
      dragon: "#0A6DC4",
      dark: "#5A5366",
      steel: "#5A8EA1",
      fairy: "#EC8FE6",
    }
    return typeColors[type] || "#f4511e"
  }

  const mainColor = getTypeColor(pokemon.types[0])

  return (
    <ScrollView style={[styles.container, { backgroundColor: "#f8f8f8" }]} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { backgroundColor: mainColor }]}>
        <View style={styles.idContainer}>
          <Text style={styles.idText}>#{pokemon.id.toString().padStart(3, "0")}</Text>
        </View>
        <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
          <Ionicons name={favorite ? "heart" : "heart-outline"} size={28} color={favorite ? "#f4511e" : "#fff"} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>

        <View style={styles.typesContainer}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Altura</Text>
              <Text style={styles.infoValue}>{pokemon.height} m</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Peso</Text>
              <Text style={styles.infoValue}>{pokemon.weight} kg</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <View style={styles.abilitiesContainer}>
            {pokemon.abilities.map((ability, index) => (
              <View key={index} style={styles.abilityBadge}>
                <Text style={styles.abilityText}>
                  {ability.charAt(0).toUpperCase() + ability.slice(1).replace("-", " ")}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          <View style={styles.statsContainer}>
            {pokemon.stats.map((stat, index) => (
              <StatBar key={index} name={stat.name} value={stat.value} />
            ))}
          </View>
        </View>

        <EvolutionChain evolutions={evolutions} onPokemonPress={handleEvolutionPress} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  header: {
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  idContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  idText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    width: 220,
    height: 220,
  },
  favoriteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 50,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 30,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    gap: 10,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 16,
  },
  infoItem: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  abilitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  abilityBadge: {
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 50,
  },
  abilityText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  statsContainer: {
    marginTop: 8,
  },
})

export default PokemonDetailScreen