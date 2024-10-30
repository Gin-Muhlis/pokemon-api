import { ApiProperty } from '@nestjs/swagger';
import { ResultPokemonDto } from 'src/modules/pokemon/dtos/result-pokemon.dto';

export class CatchedDto {
  @ApiProperty({
    description: 'id catch',
    example: '671f5438753a0d9c152b47b7',
  })
  _id: unknown | string;

  @ApiProperty({
    description: 'The nickname of the pokemon',
    example: 'PikaPoke',
  })
  nickname: string;

  @ApiProperty({
    type: ResultPokemonDto,
    description: 'captured pokemon data',
  })
  pokemon: ResultPokemonDto;
}
