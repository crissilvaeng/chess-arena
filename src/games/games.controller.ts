import { Controller, Post, Body } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGame } from './dto/create-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(@Body() createGame: CreateGame) {
    const game = await this.gamesService.create(createGame);
    return { id: game.id, white: game.white, black: game.black };
  }
}
