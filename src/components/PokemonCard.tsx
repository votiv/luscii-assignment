import { type PokemonTeamMember } from "../api/types/pokemonTeamMember.type"

type PokemonCardProps = {
  pokemon: PokemonTeamMember
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => (
  <div className="bg-red-200">
    <img title={pokemon.name} className="hover:animate-bounce p-1" src={pokemon.imagePath} alt={pokemon.name} />
  </div>
)

PokemonCard.displayName = "PokemonCard"
