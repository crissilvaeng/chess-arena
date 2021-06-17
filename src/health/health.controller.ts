import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, MicroserviceHealthIndicator } from '@nestjs/terminus';
import { RedisOptions, Transport } from '@nestjs/microservices';

import { ConfigService } from '@nestjs/config';
import { DockerHealthIndicator } from 'src/docker/docker.health';

@Controller('health')
export class HealthController {
  constructor(
    private readonly config: ConfigService,
    private readonly health: HealthCheckService,
    private readonly docker: DockerHealthIndicator,
    private readonly microservice: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.docker.ping('docker'),
      async () =>
      this.microservice.pingCheck<RedisOptions>('redis', {
        transport: Transport.REDIS,
        options: {
          url: this.config.get<string>('REDIS_URL'),
        },
      }),
    ]);
  }
}
