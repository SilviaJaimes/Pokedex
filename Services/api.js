const BASE_URL = "https://pokeapi.co/api/v2"

export const fetchPokemons = async (limit = 60) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`)
    const data = await response.json()

    const pokemonList = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url)
        const detailData = await detailResponse.json()

        return {
          id: detailData.id,
          name: detailData.name,
          url: pokemon.url,
          image: detailData.sprites.other["official-artwork"].front_default || detailData.sprites.front_default,
          types: detailData.types.map((type) => type.type.name),
        }
      }),
    )

    return pokemonList
  } catch (error) {
    console.error("Error fetching pokemons:", error)
    throw error
  }
}

export const fetchPokemonTypes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/type`)
    const data = await response.json()

    return data.results
  } catch (error) {
    console.error("Error fetching pokemon types:", error)
    throw error
  }
}

export const fetchPokemonDetail = async (idOrName) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`)
    const data = await response.json()

    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
      types: data.types.map((type) => type.type.name),
      height: data.height / 10, // Convert to meters
      weight: data.weight / 10, // Convert to kg
      abilities: data.abilities.map((ability) => ability.ability.name),
      stats: data.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
    }
  } catch (error) {
    console.error("Error fetching pokemon detail:", error)
    throw error
  }
}

export const fetchPokemonSpecies = async (idOrName) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon-species/${idOrName}`)
    const data = await response.json()

    return {
      evolutionChainUrl: data.evolution_chain.url,
    }
  } catch (error) {
    console.error("Error fetching pokemon species:", error)
    throw error
  }
}

export const fetchEvolutionChain = async (url) => {
  try {
    const response = await fetch(url)
    const data = await response.json()

    const chain = []
    let evolutionData = data.chain

    do {
      const evolutionDetails = evolutionData.evolution_details[0] || {}

      chain.push({
        species_name: evolutionData.species.name,
        min_level: evolutionDetails.min_level || null,
        url: evolutionData.species.url,
      })

      evolutionData = evolutionData.evolves_to[0]
    } while (evolutionData && evolutionData.hasOwnProperty("evolves_to"))

    // Fetch additional data for each evolution
    const evolutionChain = await Promise.all(
      chain.map(async (evolution) => {
        const id = evolution.url.split("/").filter(Boolean).pop()
        const pokemonResponse = await fetch(`${BASE_URL}/pokemon/${id}`)
        const pokemonData = await pokemonResponse.json()

        return {
          ...evolution,
          id: pokemonData.id,
          image: pokemonData.sprites.other["official-artwork"].front_default || pokemonData.sprites.front_default,
        }
      }),
    )

    return evolutionChain
  } catch (error) {
    console.error("Error fetching evolution chain:", error)
    throw error
  }
}
