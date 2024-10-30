import { ApiProperty } from '@nestjs/swagger';

export class CheckCatchedResponseDto {
  @ApiProperty({ description: 'status response', example: 200 })
  statusCode: number;

  @ApiProperty({ description: 'status catched pokemon', example: true })
  isCatched: boolean;
}
