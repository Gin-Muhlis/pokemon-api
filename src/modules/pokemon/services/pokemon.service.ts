import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../../../database/schemas/pokemon.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { ListPokemonResponseDto } from '../dtos/list-pokemon-response.dto';
import { DetailPokemonResponseDto } from '../dtos/detail-pokemon-response.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: mongoose.Model<Pokemon>,
  ) {}

  async find(query: Query): Promise<ListPokemonResponseDto> {
    const limitData = 21;
    const currentPage = Number(query.page) || 1;
    const nextPage = currentPage + 1;
    const skipData = limitData * (currentPage - 1);

    const pokemons = await this.pokemonModel
      .find()
      .select('id name image number')
      .limit(limitData)
      .skip(skipData);

    return {
      statusCode: HttpStatus.OK,
      nextPage,
      results: pokemons,
    };
  }

  async detail(name: string): Promise<DetailPokemonResponseDto> {
    const pokemon = await this.pokemonModel.findOne({ name });

    if (!pokemon) throw new BadRequestException();

    return {
      statusCode: HttpStatus.OK,
      pokemon,
    };
  }
}
