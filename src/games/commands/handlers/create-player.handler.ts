import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ConfigService } from '@nestjs/config';
import { CreatePlayerCommand } from '../create-player.command';
import { DockerService } from 'src/docker/docker.service';
import { GameRepository } from 'src/games/repository/game.repository';

@CommandHandler(CreatePlayerCommand)
export class CreatePlayerHandler
  implements ICommandHandler<CreatePlayerCommand>
{
  constructor(
    private readonly config: ConfigService,
    private readonly service: DockerService,
    private readonly repository: GameRepository,
  ) {}

  async execute(command: CreatePlayerCommand) {
    const player = command.image.replace(/[^a-zA-Z0-9]/, '-');
    const container = await this.service.run(command.image, {
      command: ['yarn', 'prod:start'],
      env: [
        `RABBITMQ_URL=${this.config.get('AMQP_SERVICE')}`,
        `EXCHANGE_NAME=${this.config.get('EXCHANGE_NAME', 'games.exchange')}`,
        `QUEUE_NAME=player.${player}`,
        `ROUTING_KEY=${player}`,
      ],
      labels: { yifan: 'player' },
    });
    this.repository.update(command.game, {
      [`${command.player}.container`]: container.id,
    });
  }
}
