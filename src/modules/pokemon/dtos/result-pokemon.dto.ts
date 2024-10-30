import { ApiProperty } from '@nestjs/swagger';

export class ResultPokemonDto {
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
    description: 'image of the pokemon',
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  })
  image: string;
}
