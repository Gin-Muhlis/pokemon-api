import { ApiProperty } from '@nestjs/swagger';
import { Stat } from '../../../database/schemas/stat.schema';
import { StatDto } from './stat.dto';

export class PokemonDto {
  @ApiProperty({
    description: 'id of the pokemon',
    example: '671f5438753a0d9c152b47b7',
  })
  _id: unknown | string;

  @ApiProperty({ description: 'name of the pokemon', example: 'bulbasaur' })
  name: string;

  @ApiProperty({ description: 'number of the pokemon', example: 1 })
  number: number;

  @ApiProperty({
    description: 'types of the pokemon',
    isArray: true,
    example: ['grass', 'poison'],
  })
  types: string[];

  @ApiProperty({ description: 'height of the pokemon', example: 7 })
  height: number;

  @ApiProperty({ description: 'weight of the pokemon', example: 69 })
  weight: number;

  @ApiProperty({
    description: 'abilities of the pokemon',
    isArray: true,
    example: ['overgrow', 'chlorophyll'],
  })
  abilities: string[];

  @ApiProperty({
    description: 'image of the pokemon',
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  })
  image: string;

  @ApiProperty({ description: 'experience of the pokemon', example: 64 })
  experience: number;

  @ApiProperty({
    type: StatDto,
    description: 'stats of the pokemon',
    example: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
      _id: '6721a8d65bc8c48a71ac6a2a',
    },
  })
  stats: StatDto;

  @ApiProperty({
    description: 'list move of the pokemon',
    isArray: true,
    example: ['razor-wind', 'swords-dance', 'cut'],
  })
  moves: string[];
}

export class ParamPokemonDto {
  @ApiProperty({
    type: String,
    description: 'Name from the pokemon',
    example: 'bulbasaur'
  })
  name: string;
}
