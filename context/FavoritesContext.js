"use client"

import { createContext, useState, useEffect, useContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites")
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites))
        }
      } catch (error) {
        console.error("Error loading favorites:", error)
      }
    }

    loadFavorites()
  }, [])

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites))
      } catch (error) {
        console.error("Error saving favorites:", error)
      }
    }

    saveFavorites()
  }, [favorites])

  const addFavorite = (pokemon) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.id === pokemon.id)) {
        return prev
      }
      return [...prev, pokemon]
    })
  }

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((pokemon) => pokemon.id !== id))
  }

  const isFavorite = (id) => {
    return favorites.some((pokemon) => pokemon.id === id)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
