import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { HistoryService } from '../services/history.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from 'src/shared/dtos/internal-server-error-response.dto';
import { ListHistoryResponseDto } from '../dtos/list-history-response.dto';
import { apiSwaggerResponse } from 'src/shared/helpers/swagger.helper';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get list history catched pokemon' })
  @ApiOkResponse(apiSwaggerResponse(ListHistoryResponseDto, 'List data history catched pokemon fetched successfully'))
  @ApiInternalServerErrorResponse(apiSwaggerResponse(InternalServerErrorResponseDto, 'Internal server error'))
  getlistHistory() {
    return this.historyService.findHistory();
  }
}
