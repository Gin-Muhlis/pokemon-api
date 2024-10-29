import { Controller, Get, HttpStatus, UseInterceptors } from '@nestjs/common';
import { HistoryService } from '../services/history.service';
import { GetListHistoryResponse } from 'src/types/responses.type';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getlistHistory(): Promise<GetListHistoryResponse> {
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
