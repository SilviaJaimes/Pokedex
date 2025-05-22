// components/StatBar.js
import { View, Text, StyleSheet } from "react-native"

const getStatColor = (name) => {
  const statColors = {
    hp: "#FF5959",
    attack: "#F5AC78",
    defense: "#FAE078",
    "special-attack": "#9DB7F5",
    "special-defense": "#A7DB8D",
    speed: "#FA92B2",
  }

  return statColors[name] || "#A8A878"
}

const getStatName = (name) => {
  const statNames = {
    hp: "HP",
    attack: "Ataque",
    defense: "Defensa",
    "special-attack": "Atq. Esp.",
    "special-defense": "Def. Esp.",
    speed: "Velocidad",
  }

  return statNames[name] || name
}

const StatBar = ({ name, value, maxValue = 255 }) => {
  const percentage = (value / maxValue) * 100

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{getStatName(name)}</Text>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.bar,
            {
              width: `${percentage}%`,
              backgroundColor: getStatColor(name),
            },
          ]}
        />
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    width: 100,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  barContainer: {
    flex: 1,
    height: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 5,
  },
  value: {
    width: 40,
    fontSize: 14,
    color: "#333",
    textAlign: "right",
    fontWeight: "bold",
  },
})

export default StatBar