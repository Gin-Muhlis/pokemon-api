import { ApiProperty } from '@nestjs/swagger';
import { ResultPokemonDto } from './result-pokemon.dto';

export class ListPokemonResponseDto {
  @ApiProperty({ description: 'status response', example: 200 })
  statusCode: number;

  @ApiProperty({
    description: 'number of the next page',
    example: 2,
  })
  nextPage: number;

  @ApiProperty({ description: 'list of pokemon', type: [ResultPokemonDto] })
  results: ResultPokemonDto[];
}
