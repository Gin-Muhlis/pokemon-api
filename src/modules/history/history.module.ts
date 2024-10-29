import { Module } from '@nestjs/common';
import { HistoryController } from './controllers/history.controller';
import { HistoryService } from './services/history.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorySchema } from 'src/database/schemas/history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
