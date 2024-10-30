import { ApiProperty } from '@nestjs/swagger';

export class CatchPokemonResponseDto {
  @ApiProperty({ description: 'status response', example: 201 })
  statusCode: number;

  @ApiProperty({
    description: 'message response',
    example: 'Pokemon pikachu successfully catched',
  })
  message: string;
}
