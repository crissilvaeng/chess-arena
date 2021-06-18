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
    await this.service.run(command.image, {
      command: ['node', 'dist/main'],
      env: [
        `NATS_URL=${this.config.get('ENGINES_NATS_URL')}`,
        `NATS_SUBJECT=games.*.${command.image.replace(/[^a-zA-Z0-9]/, '-')}`,
      ],
      labels: { yifan: 'player' },
    });
  }
}
