import { ApiProperty } from '@nestjs/swagger';
import { PokemonDto } from 'src/modules/pokemon/dtos/pokemon.dto';

export class CatchedDto {
  @ApiProperty({
    description: 'The nickname of the pokemon',
    example: 'PikaPoke',
  })
  nickname: string;

  @ApiProperty({
    type: PokemonDto,
    description: 'captured pokemon data',
    example: {
      _id: '6721a8d65bc8c48a71ac6a59',
      name: 'pikachu',
      number: 25,
      types: ['electric'],
      height: 4,
      weight: 60,
      abilities: ['static', 'lightning-rod'],
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      experience: 112,
      stats: {
        hp: 35,
        attack: 55,
        defense: 40,
        specialAttack: 50,
        specialDefense: 50,
        speed: 90,
        _id: '6721a8d65bc8c48a71ac6a5a',
      },
      moves: ['mega-punch', 'pay-day', 'thunder-punch'],
    },
  })
  pokemon: PokemonDto;
}
