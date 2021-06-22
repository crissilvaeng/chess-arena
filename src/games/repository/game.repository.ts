import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Color } from '../constants';
import { Game } from '../models/game.model';
import { Game as GameSchema, GameDocument } from '../schemas/game.schema';

@Injectable()
export class GameRepository {
  constructor(
    @InjectModel(GameSchema.name) private gameModel: Model<GameDocument>,
  ) {}

  async create(id: string, white: string, black: string) {
    const game = await this.gameModel.create({
      _id: id,
      white: { color: Color.White, image: white },
      black: { color: Color.Black, image: black },
    });
    return new Game(game.id, game.white.image, game.status, game.black.image);
  }

  async findById(id: string) {
    const game = await this.gameModel.findById(id);
    return new Game(
      game.id,
      game.white.image,
      game.black.image,
      game.status,
      game.moves.map((move) => move.move),
      game.outcome,
    );
  }

  async update(id: string, update: object) {
    const game = await this.gameModel.findByIdAndUpdate(
      id,
      {
        $set: update,
      },
      { new: true },
    );
    return new Game(
      game.id,
      game.white.image,
      game.black.image,
      game.status,
      game.moves.map((move) => move.move),
      game.outcome,
    );
  }

  async add(id: string, move: object) {
    const game = await this.gameModel.findByIdAndUpdate(
      id,
      {
        $push: { moves: move },
      },
      { new: true },
    );
    return new Game(
      game.id,
      game.white.image,
      game.black.image,
      game.status,
      game.moves.map((move) => move.move),
      game.outcome,
    );
  }
}
