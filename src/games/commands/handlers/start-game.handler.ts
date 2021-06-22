import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { GameRepository } from 'src/games/repository/game.repository';
import { GameStartedEvent } from 'src/games/events/game-started.event';
import { StartGameCommand } from '../start-game.command';

@CommandHandler(StartGameCommand)
export class StartGamneHandler implements ICommandHandler<StartGameCommand> {
  constructor(
    private readonly repository: GameRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: StartGameCommand) {
    const { game: id } = command;
    const game = this.publisher.mergeObjectContext(
      await this.repository.update(id, {
        status: 'Running',
      }),
    );
    game.publish(new GameStartedEvent(id, game.white, game.black));
  }
}
