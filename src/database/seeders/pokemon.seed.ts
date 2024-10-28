import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../schemas/pokemon.schema';
import * as mongoose from 'mongoose';
import axios from 'axios';
import {
  PokemonAbility,
  PokemonList,
  PokemonMove,
  PokemonType,
} from 'src/types/pokemon.type';

@Injectable()
export class PokemonSeeder {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: mongoose.Model<Pokemon>,
  ) {}

  async fetchAndSeedPokemons() {
    const limit = 42;
    const response = await axios.get(`${process.env.SEEDER_URI}/?limit=${limit}`);
    const pokemonList = response.data.results;
    
    const pokemons = await Promise.all(
      pokemonList.map(async (pokemon: PokemonList) => {
        const { data } = await axios.get(pokemon.url);

        return {
          name: data.name,
          number: data.id,
          types: data.types.map((type: PokemonType) => type.type.name),
          height: data.height,
          weight: data.weight,
          abilities: data.abilities.map(
            (ability: PokemonAbility) => ability.ability.name,
          ),
          image: data.sprites.other['official-artwork'].front_default,
          experience: data.base_experience,
          stats: {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            specialAttack: data.stats[3].base_stat,
            specialDefense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
          },
          moves: data.moves.map((move: PokemonMove) => move.move.name),
        };
      }),
    );

    await this.pokemonModel.insertMany(pokemons);
    console.log('Pokemon seed successfully');
  }
}
