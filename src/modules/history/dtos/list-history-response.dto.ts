import { ApiProperty } from "@nestjs/swagger";
import { HistoryDto } from "./history.dto";

export class ListHistoryResponseDto {
    @ApiProperty({description: 'status response', example: 200})
    statusCode: number

    @ApiProperty({description: 'list of history', type: [HistoryDto]})
    results: HistoryDto[]
}