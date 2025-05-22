// context/PokemonContext.js
import { createContext, useState, useEffect, useContext } from "react"
import { fetchPokemons, fetchPokemonTypes } from "../Services/api"

const PokemonContext = createContext()

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([])
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [types, setTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTypes, setSelectedTypes] = useState([])
  const [sortOption, setSortOption] = useState("id") // Default sort by ID

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true)
        const pokemonData = await fetchPokemons(60)
        setPokemons(pokemonData)
        setFilteredPokemons(pokemonData)

        const typesData = await fetchPokemonTypes()
        setTypes(typesData)
      } catch (err) {
        setError("Error al cargar los datos. Por favor, intenta de nuevo.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  useEffect(() => {
    let result = [...pokemons]

    // Apply search filter
    if (searchTerm) {
      result = result.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Apply type filters
    if (selectedTypes.length > 0) {
      result = result.filter((pokemon) => selectedTypes.every((type) => pokemon.types.includes(type)))
    }

    // Apply sorting
    result = sortPokemons(result, sortOption)

    setFilteredPokemons(result)
  }, [searchTerm, selectedTypes, pokemons, sortOption])

  const sortPokemons = (pokemonList, option) => {
    switch (option) {
      case "id":
        return [...pokemonList].sort((a, b) => a.id - b.id);
      case "id-desc":
        return [...pokemonList].sort((a, b) => b.id - a.id);
      case "name":
        return [...pokemonList].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...pokemonList].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return pokemonList;
    }
  };

  const toggleTypeFilter = (type) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const clearTypeFilters = () => {
    setSelectedTypes([])
  }

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        filteredPokemons,
        types,
        loading,
        error,
        searchTerm,
        selectedTypes,
        sortOption,
        setSearchTerm,
        toggleTypeFilter,
        clearTypeFilters,
        setSortOption,
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}

export const usePokemon = () => {
  const context = useContext(PokemonContext)
  if (context === undefined) {
    throw new Error("usePokemon must be used within a PokemonProvider")
  }
  return context
}