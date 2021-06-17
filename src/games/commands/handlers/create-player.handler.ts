import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreatePlayerCommand } from '../create-player.command';
import { DockerService } from 'src/docker/docker.service';

@CommandHandler(CreatePlayerCommand)
export class CreatePlayerHandler
  implements ICommandHandler<CreatePlayerCommand>
{
  constructor(private readonly service: DockerService) {
  }

  async execute(command: CreatePlayerCommand) {
    this.service.run(command.image)
  }
}
