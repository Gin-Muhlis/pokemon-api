import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CatchedService } from '../services/catched.service';
import { CatchPokemonDto } from '../dtos/create-catch-pokemon.dto';
import { isValidObjectId } from 'mongoose';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ListCatchedResponseDto } from '../dtos/list-catched-response.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from 'src/shared/dtos/internal-server-error-response.dto';
import { CatchPokemonResponseDto } from '../dtos/catch-pokemon-response.dto';
import { BadRequestResponseDto } from 'src/shared/dtos/bad-request-response.dto';
import { DeleteCatchedResponseDto } from '../dtos/delete-catched-response.dto';
import { CountCatchedResponseDto } from '../dtos/count-catched-response.dto';
import { CheckCatchedResponseDto } from '../dtos/check-catched-response.dto';

@Controller('catched')
export class CatchedController {
  constructor(private catchedService: CatchedService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get list data of pokemon' })
  @ApiOkResponse({
    description: 'List data catched pokemon fetched successfully',
    type: ListCatchedResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: InternalServerErrorResponseDto,
  })
  async getListCatched(): Promise<ListCatchedResponseDto> {
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
  @ApiOperation({ summary: 'Catch pokemon' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id pokemon to catch',
    example: '6721a8d65bc8c48a71ac6a59',
  })
  @ApiBody({ type: CatchPokemonDto })
  @ApiOkResponse({
    description: 'pokemon catched successfully',
    type: CatchPokemonResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: InternalServerErrorResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Id pokemon is not valid',
    type: BadRequestResponseDto,
  })
  async catchPokemon(
    @Param('id') id: string,
    @Body() createDto: CatchPokemonDto,
  ): Promise<CatchPokemonResponseDto> {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('pokemon is not valid');
      }

      const catchedPokemon = await this.catchedService.createCatched(
        id,
        createDto,
      );

      return {
        statusCode: HttpStatus.CREATED,
        message: `Pokemon ${catchedPokemon.name} successfully catched`,
      };
    } catch (error) {
      throw error.response;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete catched pokemon' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id data catched to delete',
    example: '6721a8d65bc8c48a71ac6a59',
  })
  @ApiOkResponse({
    description: 'data pokemon catched deleted successfully',
    type: DeleteCatchedResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: InternalServerErrorResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Id pokemon is not valid',
    type: BadRequestResponseDto,
  })
  async deletePokemonCatched(
    @Param('id') id: string,
  ): Promise<DeleteCatchedResponseDto> {
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
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Count catched pokemon' })
  @ApiOkResponse({
    description: 'count pokemon catched fetched successfully',
    type: CountCatchedResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: InternalServerErrorResponseDto,
  })
  async getCountPokemonCatched(): Promise<CountCatchedResponseDto> {
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
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Check is pokemon catched' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id data pokemon to check',
    example: '6721a8d65bc8c48a71ac6a59',
  })
  @ApiOkResponse({
    description: 'check pokemon catched fetched successfully',
    type: CheckCatchedResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: InternalServerErrorResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Id pokemon is not valid',
    type: BadRequestResponseDto,
  })
  async getCheckIsPokemonChecked(
    @Param('id') id: string,
  ): Promise<CheckCatchedResponseDto> {
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
