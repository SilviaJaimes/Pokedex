// components/EvolutionChain.js
import React from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const EvolutionChain = ({ evolutions, onPokemonPress }) => {
  if (!evolutions || evolutions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noEvolutionsText}>No hay información de evoluciones disponible</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadena de Evolución</Text>
      <View style={styles.chainContainer}>
        {evolutions.map((evolution, index) => (
          <React.Fragment key={evolution.id}>
            {index > 0 && (
              <View style={styles.arrowContainer}>
                <Ionicons name="arrow-forward" size={24} color="#666" />
                {evolution.min_level && <Text style={styles.levelText}>Nv. {evolution.min_level}</Text>}
              </View>
            )}
            <TouchableOpacity
              style={styles.evolutionItem}
              onPress={() => onPokemonPress(evolution.id, evolution.species_name)}
            >
              <View style={styles.evolutionImageContainer}>
                <Image source={{ uri: evolution.image }} style={styles.evolutionImage} resizeMode="contain" />
              </View>
              <Text style={styles.evolutionName}>
                {evolution.species_name.charAt(0).toUpperCase() + evolution.species_name.slice(1)}
              </Text>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  chainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  arrowContainer: {
    alignItems: "center",
    marginHorizontal: 12,
  },
  levelText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    fontWeight: "500",
  },
  evolutionItem: {
    alignItems: "center",
    padding: 8,
  },
  evolutionImageContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  evolutionImage: {
    width: 80,
    height: 80,
  },
  evolutionName: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
    color: "#333",
  },
  noEvolutionsText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
})

export default EvolutionChain