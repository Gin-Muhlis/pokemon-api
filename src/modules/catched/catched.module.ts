import { Module } from '@nestjs/common';
import { CatchedController } from './controllers/catched.controller';
import { CatchedService } from './services/catched.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatchedSchema } from 'src/database/schemas/catched.schema';
import { PokemonSchema } from 'src/database/schemas/pokemon.schema';
import { HistorySchema } from 'src/database/schemas/history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Catched', schema: CatchedSchema },
      { name: 'Pokemon', schema: PokemonSchema },
      { name: 'History', schema: HistorySchema },
    ]),
  ],
  controllers: [CatchedController],
  providers: [CatchedService],
})
export class CatchedModule {}
