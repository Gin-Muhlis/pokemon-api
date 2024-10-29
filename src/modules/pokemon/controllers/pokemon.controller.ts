import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';
import {
  GetDetailPokemonResponse,
  GetListPokemonResponse,
} from 'src/types/responses.type';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getListPokemon(
    @Query() query: ExpressQuery,
  ): Promise<GetListPokemonResponse> {
    try {
      const page = Number(query.page) || 1;
      const nextPage = page + 1;
      const pokemons = await this.pokemonService.find(page);

      return {
        statusCode: HttpStatus.OK,
        nextPage,
        results: pokemons,
      };
    } catch (error) {
      throw error.response;
    }
  }

  @Get(':name')
  @UseInterceptors(CacheInterceptor)
  async getDetailPokemon(
    @Param('name') name: string,
  ): Promise<GetDetailPokemonResponse> {
    try {
      const pokemon = await this.pokemonService.detail(name);

      if (pokemon == null) throw new BadRequestException('Pokemon not found');

      return {
        statusCode: HttpStatus.OK,
        pokemon,
      };
    } catch (error) {
      throw error.response;
    }
  }
}
