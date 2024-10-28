import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';
import { GetListPokemonResponse } from 'src/types/responses.type';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Pokemon } from 'src/database/schemas/pokemon.schema';

@Controller('pokemons')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get()
  async getListPokemon(
    @Query() query: ExpressQuery,
  ): Promise<GetListPokemonResponse> {
    const page = Number(query.page) || 1;
    const nextPage = page + 1;
    const pokemons = await this.pokemonService.find(page);

    return {
      nextPage,
      results: pokemons,
    };
  }

  @Get(':id')
  async getDetailPokemon(@Param('id') id: string): Promise<Pokemon> {
    return await this.pokemonService.detail(id);
  }
}
