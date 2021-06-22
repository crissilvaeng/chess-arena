import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreatePlayerCommand } from '../create-player.command';
import { GameRepository } from 'src/games/repository/game.repository';
import { PlayerCreatedEvent } from 'src/games/events/player-created.event';
import { PlayerService } from 'src/games/services/players.service';

@CommandHandler(CreatePlayerCommand)
export class CreatePlayerHandler
  implements ICommandHandler<CreatePlayerCommand>
{
  constructor(
    private readonly service: PlayerService,
    private readonly repository: GameRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreatePlayerCommand) {
    const { game: id, image, player } = command;
    const key = image.replace(/[^a-zA-Z0-9]/, '-');
    const container = await this.service.createPlayer(id, player, key, image);
    const game = this.publisher.mergeObjectContext(
      await this.repository.update(id, {
        [`${command.player}.container`]: container.id,
      }),
    );
    game.publish(new PlayerCreatedEvent(id, player, image, container.id));
  }
}
