import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CheckCatchedResponseDto {
  @ApiProperty({ description: 'status response', example: 200 })
  statusCode: number;

  @ApiProperty({ description: 'status catched pokemon', example: true })
  isCatched: boolean;
}

export class ParamCheckCatchedDto {
  @IsNotEmpty()
  @ApiProperty({type: String, description:'Id data pokemon to check', example: '6721a8d65bc8c48a71ac6a59'})
  id:string;
}