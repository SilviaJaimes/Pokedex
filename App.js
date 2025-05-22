// App.js
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { FavoritesProvider } from "./context/FavoritesContext"
import { PokemonProvider } from "./context/PokemonContext"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"

// Importa las pantallas
import HomeScreen from "./screens/HomeScreen"
import FavoritesScreen from "./screens/FavoriteScreen"
import PokemonDetailScreen from "./screens/PokemonDetailScreen"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
          elevation: 0, // Elimina la sombra en Android
          shadowOpacity: 0, // Elimina la sombra en iOS
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false, // Oculta el header para usar nuestro propio diseño
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
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
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
            iconName = focused ? "list" : "list-outline"
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#f4511e",
        tabBarInactiveTintColor: "#888",
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ title: "Pokédex" }} />
      <Tab.Screen name="Favorites" component={FavoritesStack} options={{ title: "Favoritos" }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PokemonProvider>
          <FavoritesProvider>
            <StatusBar style="light" />
            <MainNavigator />
          </FavoritesProvider>
        </PokemonProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}