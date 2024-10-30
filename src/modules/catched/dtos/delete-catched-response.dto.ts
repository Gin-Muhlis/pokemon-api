import { ApiProperty } from "@nestjs/swagger";

export class DeleteCatchedResponseDto {
    @ApiProperty({ description: 'status response', example: 200 })
    statusCode: number;
  
    @ApiProperty({
      description: 'message response',
      example: 'Pokemon pikachu successfully deleted',
    })
    message: string;
}