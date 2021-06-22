import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { PublishNotificationCommand } from '../publish-notification.command';

@CommandHandler(PublishNotificationCommand)
export class PublishNotificationHandler
  implements ICommandHandler<PublishNotificationCommand>
{
  constructor(@Inject('NATS') private readonly client: ClientProxy) {}

  async execute(command: PublishNotificationCommand) {
    await this.client.emit(command.header, command.payload);
  }
}
