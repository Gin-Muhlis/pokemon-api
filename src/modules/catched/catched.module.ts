import { Module } from '@nestjs/common';
import { CatchedController } from './catched.controller';
import { CatchedService } from './catched.service';

@Module({
  controllers: [CatchedController],
  providers: [CatchedService]
})
export class CatchedModule {}
