import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CatchedService } from '../services/catched.service';
import { CatchPokemonDto, ParamCatchDto } from '../dtos/create-catch-pokemon.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ListCatchedResponseDto } from '../dtos/list-catched-response.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from 'src/shared/dtos/internal-server-error-response.dto';
import { CatchPokemonResponseDto } from '../dtos/catch-pokemon-response.dto';
import { BadRequestResponseDto } from 'src/shared/dtos/bad-request-response.dto';
import { DeleteCatchedResponseDto, ParamDeleteCatchedDto } from '../dtos/delete-catched-response.dto';
import { CountCatchedResponseDto } from '../dtos/count-catched-response.dto';
import { CheckCatchedResponseDto, ParamCheckCatchedDto } from '../dtos/check-catched-response.dto';
import { apiSwaggerResponse } from 'src/shared/helpers/swagger.helper';

@Controller('catched')
export class CatchedController {
  constructor(private catchedService: CatchedService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get list data of pokemon' })
  @ApiOkResponse(apiSwaggerResponse(ListCatchedResponseDto, 'List data catched pokemon fetched successfully'))
  @ApiInternalServerErrorResponse(apiSwaggerResponse(InternalServerErrorResponseDto, 'Internal server error'))
  getListCatched() {
    return this.catchedService.findCatched();
  }

  @Post(':id')
  @ApiOperation({ summary: 'Catch pokemon' })
  @ApiOkResponse(apiSwaggerResponse(CatchPokemonResponseDto, 'pokemon catched successfully'))
  @ApiInternalServerErrorResponse(apiSwaggerResponse(InternalServerErrorResponseDto, 'Internal server error'))
  @ApiBadRequestResponse(apiSwaggerResponse(BadRequestResponseDto, 'Id pokemon is not valid'))
  catchPokemon(
    @Param() { id }: ParamCatchDto,
    @Body() createDto: CatchPokemonDto,
  ) {
    return this.catchedService.createCatched(id, createDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete catched pokemon' })
  @ApiOkResponse(apiSwaggerResponse(DeleteCatchedResponseDto, 'data pokemon catched deleted successfully'))
  @ApiInternalServerErrorResponse(apiSwaggerResponse(InternalServerErrorResponseDto, 'Internal server error'))
  @ApiBadRequestResponse(apiSwaggerResponse(BadRequestResponseDto, 'Id catched is not valid'))
  deletePokemonCatched(@Param() {id}: ParamDeleteCatchedDto) {
    return this.catchedService.deleteCatched(id);
  }

  @Get('count')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Count catched pokemon' })
  @ApiOkResponse(apiSwaggerResponse(CountCatchedResponseDto, 'count pokemon catched fetched successfully'))
  @ApiInternalServerErrorResponse(apiSwaggerResponse(InternalServerErrorResponseDto, 'Internal server error'))
  getCountPokemonCatched() {
    return this.catchedService.getCountCatched();
  }

  @Get('/check/:id')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Check is pokemon catched' })
  @ApiOkResponse(apiSwaggerResponse(CheckCatchedResponseDto, 'check pokemon catched fetched successfully'))
  @ApiInternalServerErrorResponse(apiSwaggerResponse(InternalServerErrorResponseDto, 'Internal server error'))
  @ApiBadRequestResponse(apiSwaggerResponse(BadRequestResponseDto, 'Id pokemon is not valid'))
  getCheckIsPokemonChecked(@Param() {id}: ParamCheckCatchedDto) {
    return this.catchedService.getIsCatched(id);
  }
}
