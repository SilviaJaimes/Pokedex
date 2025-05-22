import { View, Text, StyleSheet } from "react-native"

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

const TypeBadge = ({ type, small = false }) => {
  return (
    <View style={[styles.badge, { backgroundColor: getTypeColor(type) }]}>
      <Text style={styles.text}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 50,
    marginRight: 4,
    marginBottom: 4,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
})

export default TypeBadge