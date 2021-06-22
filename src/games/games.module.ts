import { ConfigModule, ConfigService } from '@nestjs/config';
import { Game, GameSchema } from './schemas/game.schema';

import { CqrsModule } from '@nestjs/cqrs';
import { CreateGameHandler } from './commands/handlers/create-game.handler';
import { CreatePlayerHandler } from './commands/handlers/create-player.handler';
import { DockerModule } from 'src/docker/docker.module';
import { GameRepository } from './repository/game.repository';
import { GameSagas } from './sagas/games.sagas';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { GetGameQueryHandler } from './queries/handlers/get-game.handler';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayMoveHandler } from './commands/handlers/play-move.handler';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    CqrsModule,
    DockerModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        exchanges: [
          {
            name: config.get('EXCHANGE_NAME', 'games.exchange'),
            type: config.get('EXCHANGE_TYPE', 'direct'),
          },
        ],
        uri: config.get('RABBITMQ_URL'),
        connectionInitOptions: { wait: false },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [GamesController],
  providers: [
    GameSagas,
    GamesService,
    GameRepository,
    PlayMoveHandler,
    CreateGameHandler,
    GetGameQueryHandler,
    CreatePlayerHandler,
  ],
})
export class GamesModule {}
