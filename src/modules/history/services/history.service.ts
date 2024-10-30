import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { History } from 'src/database/schemas/history.schema';
import { ListHistoryResponseDto } from '../dtos/list-history-response.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name) private historyModel: mongoose.Model<History>,
  ) {}

  async findHistory(): Promise<ListHistoryResponseDto> {
    const listHistory = await this.historyModel
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'pokemon',
        select: 'id number name image',
      });

    return {
      statusCode: HttpStatus.OK,
      results: listHistory,
    };
  }
}
