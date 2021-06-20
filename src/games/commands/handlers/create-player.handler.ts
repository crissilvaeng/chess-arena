import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ConfigService } from '@nestjs/config';
import { CreatePlayerCommand } from '../create-player.command';
import { DockerService } from 'src/docker/docker.service';

@CommandHandler(CreatePlayerCommand)
export class CreatePlayerHandler
  implements ICommandHandler<CreatePlayerCommand>
{
  constructor(
    private readonly config: ConfigService,
    private readonly service: DockerService,
  ) {}

  async execute(command: CreatePlayerCommand) {
    const player = command.image.replace(/[^a-zA-Z0-9]/, '-');
    await this.service.run(command.image, {
      command: ['yarn', 'prod:start'],
      env: [
        'RABBITMQ_URL=amqp://localhost:5672',
        'EXCHANGE_NAME=games.exchange',
        `QUEUE_NAME=player.${player}`,
        `ROUTING_KEY=${player}`,
      ],
      labels: { yifan: 'player' },
    });
  }
}
