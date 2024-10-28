import { Module } from '@nestjs/common';
import { CatchedController } from './controllers/catched.controller';
import { CatchedService } from './services/catched.service';

@Module({
  controllers: [CatchedController],
  providers: [CatchedService],
})
export class CatchedModule {}
