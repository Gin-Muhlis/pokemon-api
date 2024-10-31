import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Catched } from '../../../database/schemas/catched.schema';
import { CatchPokemonDto } from '../dtos/create-catch-pokemon.dto';
import { Pokemon } from '../../../database/schemas/pokemon.schema';
import { History } from '../../../database/schemas/history.schema';
import { ListCatchedResponseDto } from '../dtos/list-catched-response.dto';
import { CatchPokemonResponseDto } from '../dtos/catch-pokemon-response.dto';
import { DeleteCatchedResponseDto } from '../dtos/delete-catched-response.dto';
import { CountCatchedResponseDto } from '../dtos/count-catched-response.dto';
import { CheckCatchedResponseDto } from '../dtos/check-catched-response.dto';

@Injectable()
export class CatchedService {
  constructor(
    @InjectModel(Catched.name) private catchedModel: mongoose.Model<Catched>,
    @InjectModel(Pokemon.name) private pokemonModel: mongoose.Model<Pokemon>,
    @InjectModel(History.name) private historyModel: mongoose.Model<History>,
  ) {}

  async findCatched(): Promise<ListCatchedResponseDto> {
    const listCatched = await this.catchedModel
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'pokemon',
        select: 'id number name image',
      });

    return {
      statusCode: HttpStatus.OK,
      results: listCatched,
    };
  }

  async createCatched(
    id: string,
    data: CatchPokemonDto,
  ): Promise<CatchPokemonResponseDto> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException();
    }

    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException();
    }

    const pokemon = await this.pokemonModel.findById(id);

    const created = await this.catchedModel.create({
      nickname: data.nickname,
      pokemon: pokemon._id,
    });
    console.log(created);

    await this.historyModel.create({
      nickname: data.nickname,
      pokemon: pokemon._id,
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: `Pokemon ${pokemon.name} successfully catched`,
    };
  }

  async deleteCatched(id: string): Promise<DeleteCatchedResponseDto> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException();
    }

    await this.catchedModel.findByIdAndDelete(id);

    return {
      statusCode: HttpStatus.OK,
      message: `Pokemon successfully deleted`,
    };
  }

  async getCountCatched(): Promise<CountCatchedResponseDto> {
    const countCatched = await this.catchedModel.countDocuments();

    return {
      statusCode: HttpStatus.OK,
      count: Number(countCatched),
    };
  }

  async getIsCatched(id: string): Promise<CheckCatchedResponseDto> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException();
    }
    const pokemonId = new mongoose.Types.ObjectId(id);

    const isExists = await this.catchedModel.exists({ pokemon: pokemonId });
    let isPokemonCatched = true;

    if (isExists == null) isPokemonCatched = false;

    return {
      statusCode: HttpStatus.OK,
      isCatched: isPokemonCatched,
    };
  }
}
