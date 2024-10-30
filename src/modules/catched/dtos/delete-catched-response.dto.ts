import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeleteCatchedResponseDto {
    @ApiProperty({ description: 'status response', example: 200 })
    statusCode: number;
  
    @ApiProperty({
      description: 'message response',
      example: 'Pokemon pikachu successfully deleted',
    })
    message: string;
}

export class ParamDeleteCatchedDto {
  @IsNotEmpty()
  @ApiProperty({type: String, description:'Id data catched to delete', example: '6721a8d65bc8c48a71ac6a59'})
  id:string;
}