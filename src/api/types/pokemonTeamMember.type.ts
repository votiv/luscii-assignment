export type PokemonTeamMember = {
  name: string
  id: number
  imagePath: string
}

export type PartialRawPokemon = {
  id: number
  name: string
  sprites: { front_default: string }
}
