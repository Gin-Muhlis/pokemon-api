import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorResponseDto {
  @ApiProperty({
    description: 'status response',
    example: 500,
  })
  statusCode: number;

  @ApiProperty({
    description: 'message response',
    example: 'Internal server error',
  })
  message: string;
}
