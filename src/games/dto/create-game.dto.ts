import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class Game {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'username/engine:tag' })
  white: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'username/engine:tag' })
  black: string;
}
