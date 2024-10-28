import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../../../database/schemas/pokemon.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: mongoose.Model<Pokemon>,
  ) {}

  async find(currentPage: number): Promise<Pokemon[]> {
    const limitData = 21;
    const skipData = limitData * (currentPage - 1);

    return await this.pokemonModel.find().limit(limitData).skip(skipData);
  }

  async detail(id: string): Promise<Pokemon> {
    return await this.pokemonModel.findById(id);
  }
}
