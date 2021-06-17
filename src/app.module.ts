import { HealthModule } from './health/health.module';
import { Module } from '@nestjs/common';
import { DockerModule } from './docker/docker.module';

@Module({
  imports: [HealthModule, DockerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
