import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CatchedService } from '../services/catched.service';
import {
  CheckIsCatchedResponse,
  CountCatchedResponse,
  GetListCatchedResponse,
  MessageResponse,
} from '../../../types/responses.type';
import { CatchPokemonDto } from '../dtos/catch-pokemon.dto';
import { isValidObjectId } from 'mongoose';

@Controller('catched')
export class CatchedController {
  constructor(private catchedService: CatchedService) {}

  @Get()
  async getListCatched(): Promise<GetListCatchedResponse> {
    try {
      const listCatched = await this.catchedService.findCatched();

      return {
        statusCode: HttpStatus.OK,
        results: listCatched,
      };
    } catch (error) {
      throw error.response;
    }
  }

  @Post(':id')
  async catchPokemon(
    @Param('id') id: string,
    @Body() createDto: CatchPokemonDto,
  ): Promise<MessageResponse> {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('pokemon is not valid');
      }

      const catchedPokemon = await this.catchedService.createCatched(
        id,
        createDto,
      );

      return {
        statusCode: HttpStatus.OK,
        message: `Pokemon ${catchedPokemon.name} successfully catched`,
      };
    } catch (error) {
      throw error.response;
    }
  }

  @Delete(':id')
  async deletePokemonCatched(
    @Param('id') id: string,
  ): Promise<MessageResponse> {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Data pokemon is not valid');
      }

      const deletedPokemon = await this.catchedService.deleteCatched(id);

      return {
        statusCode: HttpStatus.OK,
        message: `Pokemon ${deletedPokemon.name} successfully deleted`,
      };
    } catch (error) {
      throw error.response;
    }
  }

  @Get('count')
  async getCountPokemonCatched(): Promise<CountCatchedResponse> {
    try {
      const countCatched = await this.catchedService.getCountCatched();

      return {
        statusCode: HttpStatus.OK,
        count: Number(countCatched),
      };
    } catch (error) {
      throw error.response;
    }
  }

  @Get('/check/:id')
  async getCheckIsPokemonChecked(
    @Param('id') id: string,
  ): Promise<CheckIsCatchedResponse> {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Pokemon is not valid');
      }

      const isPokemonCatched = await this.catchedService.getIsCatched(id);

      return {
        statusCode: HttpStatus.OK,
        isCatched: isPokemonCatched,
      };
    } catch (error) {
      throw error.response;
    }
  }
}
