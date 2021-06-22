import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateGameCommand } from './commands/create-game.command';
import { Game } from './dto/create-game.dto';
import { GetGameQuery } from './queries/get-game.query';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createGame(id: string, game: Game) {
    return this.commandBus.execute(
      new CreateGameCommand(id, game.white, game.black),
    );
  }

  async findGameById(id: string) {
    return this.queryBus.execute(new GetGameQuery(id));
  }
}
