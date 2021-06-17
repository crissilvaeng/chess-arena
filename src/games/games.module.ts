import { Game, GameSchema } from './schemas/game.schema';

import { CqrsModule } from '@nestjs/cqrs';
import { CreateGameHandler } from './commands/handlers/create-game.handler';
import { CreatePlayerHandler } from './commands/handlers/create-player.handler';
import { DockerModule } from 'src/docker/docker.module';
import { GameRepository } from './repository/game.repository';
import { GameSagas } from './sagas/games.sagas';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CqrsModule,
    DockerModule,
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  controllers: [GamesController],
  providers: [
    GameSagas,
    GamesService,
    GameRepository,
    CreateGameHandler,
    CreatePlayerHandler,
  ],
})
export class GamesModule {}
