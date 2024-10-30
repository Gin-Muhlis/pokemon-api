import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CatchPokemonDto {
  @ApiProperty({ description: 'Nickname of the captured pokemon' })
  @IsNotEmpty()
  @IsString()
  readonly nickname: string;
}
