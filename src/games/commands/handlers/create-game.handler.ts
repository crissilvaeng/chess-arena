import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateGameCommand } from '../create-game.command';
import { GameRepository } from 'src/games/repository/game.repository';

@CommandHandler(CreateGameCommand)
export class CreateGameHandler implements ICommandHandler<CreateGameCommand> {
  constructor(
    private readonly repository: GameRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateGameCommand) {
    const { game: id, white, black } = command;
    const game = this.publisher.mergeObjectContext(
      await this.repository.create(id, white, black),
    );
    game.commit();
  }
}
