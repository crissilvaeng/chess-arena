import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import {
  NatsOptions,
  RedisOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';

import { ConfigService } from '@nestjs/config';
import { DockerHealthIndicator } from 'src/docker/docker.health';

@Controller('health')
export class HealthController {
  constructor(
    private readonly config: ConfigService,
    private readonly health: HealthCheckService,
    private readonly docker: DockerHealthIndicator,
    private readonly mongoose: MongooseHealthIndicator,
    private readonly microservice: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.docker.ping('docker'),
      async () => this.mongoose.pingCheck('mongo'),
      async () =>
        this.microservice.pingCheck<NatsOptions>('nats', {
          transport: Transport.NATS,
          options: {
            url: this.config.get<string>('NATS_URL'),
          },
        }),
      async () =>
        this.microservice.pingCheck<RedisOptions>('redis', {
          transport: Transport.REDIS,
          options: {
            url: this.config.get<string>('REDIS_URL'),
          },
        }),
      async () =>
        this.microservice.pingCheck<RmqOptions>('rabbitmq', {
          transport: Transport.RMQ,
          options: {
            urls: [this.config.get<string>('RABBITMQ_URL')],
          },
        }),
    ]);
  }
}
