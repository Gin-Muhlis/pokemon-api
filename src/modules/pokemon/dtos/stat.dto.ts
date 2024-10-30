import { ApiProperty } from '@nestjs/swagger';

export class StatDto {
  @ApiProperty({
    description: 'Stat hp of the pokemon',
    example: 10,
  })
  hp: number;

  @ApiProperty({
    description: 'Stat attack of the pokemon',
    example: 10,
  })
  attack: number;

  @ApiProperty({
    description: 'Stat defense of the pokemon',
    example: 10,
  })
  defense: number;

  @ApiProperty({
    description: 'Stat special attack of the pokemon',
    example: 10,
  })
  specialAttack: number;

  @ApiProperty({
    description: 'Stat special defense of the pokemon',
    example: 10,
  })
  specialDefense: number;

  @ApiProperty({
    description: 'Stat speed of the pokemon',
    example: 10,
  })
  speed: number;
}
