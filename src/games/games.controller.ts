import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { nanoid } from 'nanoid';
import { AuthGuard } from './guards/auth.guard';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('games')
@UseGuards(AuthGuard)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiSecurity('api_key', ['api_key'])
  async create(@Body() createGameDto: CreateGameDto) {
    const gameId = nanoid();
    await this.gamesService.createGame(gameId, createGameDto);
    return { game: gameId };
  }
}
