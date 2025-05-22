// components/TypeFilter.js
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"

const getTypeColor = (type) => {
  const typeColors = {
    normal: "#A8A878",
    fire: "#FF9C54",
    water: "#4D90D5",
    electric: "#F3D23B",
    grass: "#78C850",
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

  return typeColors[type] || "#999999"
}

const TypeFilter = ({ types, selectedTypes, onToggleType, onClearFilters }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.typesContainer}>
      {types.map((type) => {
        const isSelected = selectedTypes.includes(type.name)
        return (
          <TouchableOpacity
            key={type.name}
            style={[
              styles.typeButton, 
              { 
                backgroundColor: isSelected ? getTypeColor(type.name) : "white",
              }
            ]}
            onPress={() => onToggleType(type.name)}
          >
            <Text 
              style={[
                styles.typeText, 
                { 
                  color: isSelected ? "white" : "#333",
                }
              ]}
            >
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  typesContainer: {
    paddingVertical: 8,
  },
  typeButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 50,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  typeText: {
    fontSize: 14,
    fontWeight: "500",
  },
})

export default TypeFilter