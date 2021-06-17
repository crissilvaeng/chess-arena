import { Controller, Post, Body } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { nanoid } from 'nanoid';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    const gameId = nanoid();
    await this.gamesService.createGame(gameId, createGameDto);
    return { game: gameId }
  }
}
