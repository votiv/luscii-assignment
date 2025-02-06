import { PokemonTeamMember } from "./pokemonTeamMember.type";

export type PokemonTeam = PokemonTeamMember[];

export type Trainer = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  pokemonTeam: PokemonTeam;
};
