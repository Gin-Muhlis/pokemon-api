import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CatchPokemonDto {
  @ApiProperty({ description: 'Nickname of the captured pokemon', example: 'Pika Poke' })
  @IsNotEmpty()
  @IsString()
  readonly nickname: string;
}

export class ParamCatchDto {
  @IsNotEmpty()
  @ApiProperty({type: String, description:'Id pokemon to catch', example: '6721a8d65bc8c48a71ac6a59'})
  id:string;
}