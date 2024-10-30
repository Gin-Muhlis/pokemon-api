import { Controller, Get, HttpStatus, UseInterceptors } from '@nestjs/common';
import { HistoryService } from '../services/history.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from 'src/shared/dtos/internal-server-error-response.dto';
import { ListHistoryResponseDto } from '../dtos/list-history-response.dto';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get list history catched pokemon' })
  @ApiOkResponse({
    description: 'List data history catched pokemon fetched successfully',
    type: ListHistoryResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: InternalServerErrorResponseDto,
  })
  async getlistHistory(): Promise<ListHistoryResponseDto> {
    try {
      const listHistory = await this.historyService.findHistory();
      return {
        statusCode: HttpStatus.OK,
        results: listHistory,
      };
    } catch (error) {
      throw error.response;
    }
  }
}
