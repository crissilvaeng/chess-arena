import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { DestroyPlayerCommand } from '../destroy-player.command';
import { GameRepository } from 'src/games/repository/game.repository';
import { PlayerDestroyedEvent } from 'src/games/events/player-destroyed.event';
import { PlayerService } from 'src/games/services/players.service';

@CommandHandler(DestroyPlayerCommand)
export class DestroyPlayerHandler implements ICommandHandler<DestroyPlayerCommand> {
  constructor(
    private readonly repository: GameRepository,
    private readonly publisher: EventPublisher,
    private readonly service: PlayerService,
  ) {}

  async execute(command: DestroyPlayerCommand) {
    const { game: id, player } = command;
    const game = this.publisher.mergeObjectContext(
      await this.repository.findById(id),
    );
    await this.service.destroyPlayer(game.containers[player])
    game.publish(new PlayerDestroyedEvent(id, player, game[player], game.containers[player]));
  }
}
