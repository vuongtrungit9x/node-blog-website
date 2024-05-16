import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty()
  postId: number;

  @ApiProperty()
  content: string;
}
