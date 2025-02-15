import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { getAFewPokemon } from "./pokemonTrainer.api"
import { type PartialRawPokemon, type PokemonTeamMember } from "./types/pokemonTeamMember.type"
import { type Trainer } from "./types/trainer.type"
import { getPokemonIds } from "./utils"

export const usePokemon = (trainers: Trainer[]) => {
  const usedPokemonIds = useMemo(
    () =>
      trainers.reduce((ids, trainer) => {
        trainer.pokemonTeam.forEach((pokemon) => {
          if (ids.indexOf(pokemon.id) === -1) {
            ids.push(pokemon.id)
          }
        })

        return ids
      }, [] as number[]),
    [trainers],
  )

  const { data, isLoading, error } = useQuery<PartialRawPokemon[], Error, PokemonTeamMember[]>({
    queryKey: ["pokemon"],
    queryFn: () => getAFewPokemon(getPokemonIds(usedPokemonIds)),
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
