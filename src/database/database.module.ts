import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './schemas/pokemon.schema';
import { PokemonSeeder } from './seeders/pokemon.seed';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ],
  providers: [PokemonSeeder],
  exports: [PokemonSeeder],
})
export class DatabaseModule {}
