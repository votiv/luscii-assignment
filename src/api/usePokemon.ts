import { useQuery } from "@tanstack/react-query"

import { getAFewPokemon } from "./pokemonTrainer.api"
import { PartialRawPokemon, type PokemonTeamMember } from "./types/pokemonTeamMember.type"

export const usePokemon = () => {
  const { data, isLoading, error } = useQuery<PartialRawPokemon[], Error, PokemonTeamMember[]>({
    queryKey: ["pokemon"],
    queryFn: getAFewPokemon,
    select: (data) =>
      data.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        imagePath: pokemon.sprites.front_default,
      })),
  })

  return {
    pokemonPool: data,
    isPokemonPoolLoading: isLoading,
    pokemonPoolError: error,
  }
}
