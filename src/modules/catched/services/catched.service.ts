import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Catched } from '../../../database/schemas/catched.schema';
import { CatchPokemonDto } from '../dtos/create-catch-pokemon.dto';
import { Pokemon } from '../../../database/schemas/pokemon.schema';
import { History } from '../../../database/schemas/history.schema';
import { CatchedDto } from '../dtos/catched.dto';

@Injectable()
export class CatchedService {
  constructor(
    @InjectModel(Catched.name) private catchedModel: mongoose.Model<Catched>,
    @InjectModel(Pokemon.name) private pokemonModel: mongoose.Model<Pokemon>,
    @InjectModel(History.name) private historyModel: mongoose.Model<History>,
  ) {}

  async findCatched(): Promise<CatchedDto[]> {
    const listCatched = await this.catchedModel
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'pokemon',
        select: 'id number name image',
      });

    return listCatched.map(
      (data) =>
        ({
          nickname: data.nickname,
          pokemon: data.pokemon,
        }) as CatchedDto,
    );
  }

  async createCatched(id: string, data: CatchPokemonDto): Promise<Pokemon> {
    const pokemon = await this.pokemonModel.findById(id);

    await this.catchedModel.create({
      nickname: data.nickname,
      pokemon: pokemon._id,
    });

    await this.historyModel.create({
      nickname: data.nickname,
      pokemon: pokemon._id,
    });

    return pokemon;
  }

  async deleteCatched(id: string): Promise<Pokemon> {
    const catchedPokemon = await this.catchedModel
      .findById(id)
      .populate('pokemon');
    const pokemon = catchedPokemon.pokemon;

    await this.catchedModel.findByIdAndDelete(id);

    return pokemon;
  }

  async getCountCatched(): Promise<number> {
    return await this.catchedModel.countDocuments();
  }

  async getIsCatched(id: string) {
    const pokemonId = new mongoose.Types.ObjectId(id);

    const isExists = await this.catchedModel.exists({ pokemon: pokemonId });

    if (isExists == null) return false;

    return true;
  }
}
