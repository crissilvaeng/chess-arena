import { Game, GameSchema } from './schemas/game.schema';

import { CqrsModule } from '@nestjs/cqrs';
import { CreateGameHandler } from './commands/handlers/create-game.handler';
import { GameRepository } from './repository/game.repository';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  controllers: [GamesController],
  providers: [GamesService, CreateGameHandler, GameRepository],
})
export class GamesModule {}
