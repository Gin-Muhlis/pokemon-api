import { ApiProperty } from "@nestjs/swagger";
import { CatchedDto } from "./catched.dto";

export class ListCatchedResponseDto {
    @ApiProperty({
      description: 'status response',
      example: 200,
    })
  statusCode: number;

  @ApiProperty({
    type: [CatchedDto],
    description: 'status response',
  })
  results: CatchedDto[];
}
