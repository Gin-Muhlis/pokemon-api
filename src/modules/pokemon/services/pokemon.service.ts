import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../../../database/schemas/pokemon.schema';
import * as mongoose from 'mongoose';
import { ResultPokemonDto } from '../dtos/results-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: mongoose.Model<Pokemon>,
  ) {}

  async find(currentPage: number): Promise<ResultPokemonDto[]> {
    const limitData = 21;
    const skipData = limitData * (currentPage - 1);

    const pokemons = await this.pokemonModel
      .find()
      .select('id name image number')
      .limit(limitData)
      .skip(skipData);

    return pokemons.map(
      (pokemon) =>
        ({
          id: pokemon._id,
          name: pokemon.name,
          image: pokemon.image,
          number: pokemon.number,
        }) as ResultPokemonDto,
    );
  }

  async detail(name: string): Promise<Pokemon> {
    return await this.pokemonModel.findOne({ name });
  }
}
