import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { CatchedModule } from './modules/catched/catched.module';
import { HistoryModule } from './modules/history/history.module';

@Module({
  imports: [PokemonModule, CatchedModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
