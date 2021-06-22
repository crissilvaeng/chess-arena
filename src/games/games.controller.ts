import { Controller, Post, Body, UseGuards, Param, Get } from '@nestjs/common';
import { Game } from './dto/create-game.dto';
import { nanoid } from 'nanoid';
import { AuthGuard } from './guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GamesService } from './games.service';

@ApiBearerAuth()
@Controller('games')
@UseGuards(AuthGuard)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(@Body() game: Game) {
    const id = game.id || nanoid();
    await this.gamesService.createGame(id, game);
    return { game: id };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.gamesService.findGameById(id);
  }
}
