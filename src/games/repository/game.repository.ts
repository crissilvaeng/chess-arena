import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from '../models/game.model';
import { Game as GameSchema, GameDocument } from '../schemas/game.schema';

@Injectable()
export class GameRepository {
  constructor(
    @InjectModel(GameSchema.name) private gameModel: Model<GameDocument>,
  ) {}

  async create(id: string, white: string, black: string) {
    const game = await this.gameModel.create({ _id: id, white, black });
    return new Game(game.id, game.white, game.black);
  }
}
