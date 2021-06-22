import { ConfigService } from '@nestjs/config';
import { DockerService } from 'src/docker/docker.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerService {
  constructor(
    private readonly service: DockerService,
    private readonly config: ConfigService,
  ) {}

  async createPlayer(key: string, image: string) {
    return await this.service.run(image, {
      command: ['yarn', 'prod:start'],
      env: [
        `RABBITMQ_URL=${this.config.get('AMQP_SERVICE')}`,
        `EXCHANGE_NAME=${this.config.get('EXCHANGE_NAME', 'games.exchange')}`,
        `QUEUE_NAME=player.${key}`,
        `ROUTING_KEY=${key}`,
      ],
      labels: { yifan: 'player' },
    });
  }
}
