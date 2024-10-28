import { Module } from '@nestjs/common';
import { PokemonController } from './controllers/pokemon.controller';
import { PokemonService } from './services/pokemon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonSchema } from '../../database/schemas/pokemon.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }])],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
