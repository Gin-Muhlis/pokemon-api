import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HistoryService } from '../services/history.service';
import { History } from '../../../database/schemas/history.schema';
import { GetListHistoryResponse } from 'src/types/responses.type';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
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
