import { ConfigModule } from '@nestjs/config';
import { DockerModule } from './docker/docker.module';
import { HealthModule } from './health/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    HealthModule,
    DockerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
