import { Game, GameDocument } from './schemas/game.schema';

import { CommandBus } from '@nestjs/cqrs';
import { CreateGameCommand } from './commands/create-game.command';
import { CreateGameDto } from './dto/create-game.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesService {
  constructor(private readonly commandBus: CommandBus) {}

  async createGame(gameId: string, createGameDto: CreateGameDto) {
    return this.commandBus.execute(
      new CreateGameCommand(gameId, createGameDto.white, createGameDto.black),
    );
  }
}
