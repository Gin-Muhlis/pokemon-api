import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CatchPokemonDto {
  @ApiProperty({ description: 'Nickname of the captured pokemon', example: 'Pika Poke' })
  @IsNotEmpty()
  @IsString()
  readonly nickname: string;
}
