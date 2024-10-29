import { History } from '../database/schemas/history.schema';
import { Catched } from '../database/schemas/catched.schema';
import { Pokemon } from '../database/schemas/pokemon.schema';

export interface GetListPokemonResponse {
  statusCode: number;
  nextPage: number;
  results: Pokemon[];
}

export interface GetDetailPokemonResponse {
  statusCode: number;
  pokemon: Pokemon;
}

export interface GetListCatchedResponse {
  statusCode: number;
  results: Catched[];
}

export interface GetListHistoryResponse {
  statusCode: number;
  results: History[];
}

export interface MessageResponse {
  statusCode: number;
  message: string;
}

export interface CountCatchedResponse {
  statusCode: number;
  count: number;
}

export interface CheckIsCatchedResponse {
  statusCode: number;
  isCatched: boolean;
}
