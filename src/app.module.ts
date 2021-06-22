import { ConfigModule, ConfigService } from '@nestjs/config';

import { DockerModule } from './docker/docker.module';
import { GamesModule } from './games/games.module';
import { HealthModule } from './health/health.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGO_URL'),
        useCreateIndex: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    DockerModule,
    GamesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
