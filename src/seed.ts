import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PokemonSeeder } from './database/seeders/pokemon.seed';

async function seed() {
  const app = await NestFactory.create(AppModule);
  const pokemonSeeder = app.get(PokemonSeeder);

  await pokemonSeeder.fetchAndSeedPokemons();
  await app.close();
}

seed()
  .then(() => {
    console.log('Seeding completed!');
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
