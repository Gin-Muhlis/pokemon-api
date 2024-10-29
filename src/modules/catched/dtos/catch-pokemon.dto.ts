import { IsNotEmpty, IsString } from 'class-validator';

export class CatchPokemonDto {
  @IsNotEmpty()
  @IsString()
  readonly nickname: string;
}
