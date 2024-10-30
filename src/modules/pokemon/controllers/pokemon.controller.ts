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
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ListPokemonResponseDto } from '../dtos/list-pokemon-response.dto';
import { InternalServerErrorResponseDto } from 'src/shared/dtos/internal-server-error-response.dto';
import { DetailPokemonResponseDto } from '../dtos/detail-pokemon-response.dto';
import { BadRequestResponseDto } from 'src/shared/dtos/bad-request-response.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get list data of pokemon' })
  @ApiOkResponse({
    description: 'List data pokemon fetched successfully',
    type: ListPokemonResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: InternalServerErrorResponseDto,
  })
  async getListPokemon(
    @Query() query: ExpressQuery,
  ): Promise<ListPokemonResponseDto> {
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
  @ApiOperation({ summary: 'Get detail data of pokemon' })
  @ApiParam({name: 'name', type: String, description: 'Name from the pokemon'})
  @ApiOkResponse({
    description: 'Detail pokemon fetched successfully',
    type: DetailPokemonResponseDto
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: InternalServerErrorResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Pokemon not found',
    type: BadRequestResponseDto,
  })
  async getDetailPokemon(
    @Param('name') name: string,
  ): Promise<DetailPokemonResponseDto> {
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
