import {
  Controller,
  Get,
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
} from '@nestjs/swagger';
import { ListPokemonResponseDto } from '../dtos/list-pokemon-response.dto';
import { InternalServerErrorResponseDto } from 'src/shared/dtos/internal-server-error-response.dto';
import { DetailPokemonResponseDto } from '../dtos/detail-pokemon-response.dto';
import { BadRequestResponseDto } from 'src/shared/dtos/bad-request-response.dto';
import { apiSwaggerResponse } from 'src/shared/helpers/swagger.helper';
import { ParamPokemonDto } from '../dtos/pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get list data of pokemon' })
  @ApiOkResponse(apiSwaggerResponse(ListPokemonResponseDto, 'List data pokemon fetched successfully'))
  @ApiInternalServerErrorResponse(apiSwaggerResponse(InternalServerErrorResponseDto, 'Internal server error'))
  getListPokemon(@Query() query: ExpressQuery) {
    return this.pokemonService.find(query);
  }

  @Get(':name')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get detail data of pokemon' })
  @ApiOkResponse(apiSwaggerResponse(DetailPokemonResponseDto, 'Detail pokemon fetched successfully'))
  @ApiInternalServerErrorResponse(apiSwaggerResponse(InternalServerErrorResponseDto, 'Internal server error'))
  @ApiBadRequestResponse(apiSwaggerResponse(BadRequestResponseDto, 'Pokemon not found'))
  getDetailPokemon(@Param() {name}: ParamPokemonDto) {
    return this.pokemonService.detail(name);
  }
}
