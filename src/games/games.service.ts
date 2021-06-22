import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Game, GameDocument } from './schemas/game.schema';

import { CreateGameCommand } from './commands/create-game.command';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGameQuery } from './queries/get-game.query';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createGame(gameId: string, createGameDto: CreateGameDto) {
    return this.commandBus.execute(
      new CreateGameCommand(gameId, createGameDto.white, createGameDto.black),
    );
  }

  async findGameById(gameId: string) {
    return this.queryBus.execute(new GetGameQuery(gameId));
  }
}
