import { ApiProperty } from '@nestjs/swagger';
import { PokemonDto } from './pokemon.dto';

export class DetailPokemonResponseDto {
  @ApiProperty({ description: 'status response', example: 200 })
  statusCode: number;

  @ApiProperty({ description: 'detail data of pokemon', type: PokemonDto })
  pokemon: PokemonDto;
}
