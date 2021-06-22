import { Controller, Post, Body, UseGuards, Param, Get } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { nanoid } from 'nanoid';
import { AuthGuard } from './guards/auth.guard';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('games')
@UseGuards(AuthGuard)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    const gameId = nanoid();
    await this.gamesService.createGame(gameId, createGameDto);
    return { game: gameId };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.gamesService.findGameById(id);
  }
}
