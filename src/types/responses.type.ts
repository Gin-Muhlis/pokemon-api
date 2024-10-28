import { Pokemon } from '../database/schemas/pokemon.schema';

export interface GetListPokemonResponse {
  nextPage: number;
  results: Pokemon[];
};
