// components/PokemonCard.js (con animaciones)
import React, { useRef, useEffect } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useFavorites } from "../context/FavoritesContext"
import TypeBadge from "./TypeBadge"

const { width } = Dimensions.get("window")
const cardWidth = (width - 48) / 2 // 2 cards per row with consistent padding

const PokemonCard = ({ pokemon, onPress, index }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const favorite = isFavorite(pokemon.id)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(50)).current

  useEffect(() => {
    // Delay animation based on index for staggered effect
    const delay = index * 100;
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleFavoritePress = (e) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(pokemon.id)
    } else {
      addFavorite(pokemon)
    }
  }

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY }],
      }}
    >
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
        <View style={styles.favoriteButtonContainer}>
          <TouchableOpacity 
            style={[styles.favoriteButton, favorite ? styles.favoriteActive : {}]} 
            onPress={handleFavoritePress}
          >
            <Ionicons 
              name={favorite ? "heart" : "heart-outline"} 
              size={22} 
              color={favorite ? "#fff" : "#666"} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.imageContainer}>
          <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.id}>#{pokemon.id.toString().padStart(3, "0")}</Text>
          <Text style={styles.name}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
          
          <View style={styles.typesContainer}>
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} small />
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  favoriteButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  favoriteButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  favoriteActive: {
    backgroundColor: "#FF6B6B",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10,
    height: 120,
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    padding: 16,
    paddingTop: 0,
    alignItems: "center",
  },
  id: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
    fontWeight: "500",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
    color: "#333",
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
})

export default PokemonCard