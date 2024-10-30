import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponseDto {
  @ApiProperty({
    description: 'status response',
    example: 400
  })
  statusCode: number;

  @ApiProperty({
    description: 'message response',
    example: 'Bad request'
  })
  message: string;
}
