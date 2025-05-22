import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"

import HomeScreen from "../screens/HomeScreen"
import FavoritesScreen from "../screens/FavoritesScreen"
import PokemonDetailScreen from "../screens/PokemonDetailScreen"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="PokemonList" component={HomeScreen} options={{ title: "Pokédex" }} />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={({ route }) => ({
          title: route.params?.name
            ? route.params.name.charAt(0).toUpperCase() + route.params.name.slice(1)
            : "Detalle",
        })}
      />
    </Stack.Navigator>
  )
}

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="FavoritesList" component={FavoritesScreen} options={{ title: "Favoritos" }} />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={({ route }) => ({
          title: route.params?.name
            ? route.params.name.charAt(0).toUpperCase() + route.params.name.slice(1)
            : "Detalle",
        })}
      />
    </Stack.Navigator>
  )
}

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "ios-list" : "ios-list-outline"
          } else if (route.name === "Favorites") {
            iconName = focused ? "ios-heart" : "ios-heart-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#f4511e",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ title: "Pokédex" }} />
      <Tab.Screen name="Favorites" component={FavoritesStack} options={{ title: "Favoritos" }} />
    </Tab.Navigator>
  )
}

export default MainNavigator
