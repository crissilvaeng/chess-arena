import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'username/engine:tag' })
  white: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'username/engine:tag' })
  black: string;
}
