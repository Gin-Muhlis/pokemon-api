import { ApiProperty } from '@nestjs/swagger';

export class CountCatchedResponseDto {
  @ApiProperty({ description: 'status response', example: 200 })
  statusCode: number;

  @ApiProperty({ description: 'count catched pokemon', example: 5 })
  count: number;
}
