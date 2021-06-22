import { Color, START_FEN } from 'src/games/constants';
import {
  CommandBus,
  CommandHandler,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Chess } from 'chess.js';
import { ConfigService } from '@nestjs/config';
import { FinishGameCommand } from '../finish-game.command';
import { GameRepository } from 'src/games/repository/game.repository';
import { MovePlayedEvent } from 'src/games/events/move-played.event';
import { PlayMoveCommand } from '../play-move.command';
import { SearchResult } from 'node-uci';

@CommandHandler(PlayMoveCommand)
export class PlayMoveHandler implements ICommandHandler<PlayMoveCommand> {
  constructor(
    private readonly repository: GameRepository,
    private readonly broker: AmqpConnection,
    private readonly publisher: EventPublisher,
    private readonly config: ConfigService,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: PlayMoveCommand) {
    const game = this.publisher.mergeObjectContext(
      await this.repository.findById(command.game),
    );
    const chess = new Chess();
    game.moves.map((move) => chess.move(move, { sloppy: true }));
    if (chess.game_over()) {
      return this.commandBus.execute(
        new FinishGameCommand(game.id, chess.moves()),
      );
    }
    const { bestmove } = await this.broker.request<SearchResult>({
      exchange: this.config.get('EXCHANGE_NAME', 'games.exchange'),
      routingKey: game[command.player].replace(/[^a-zA-Z0-9]/, '-'),
      payload: {
        position: START_FEN,
        movetime: this.config.get<number>('ENGINE_MOVETIME', 500),
        moves: game.moves,
      },
      timeout: this.config.get<number>('RESPONSE_TIMEOUT', 50000),
    });
    await this.repository.add(game.id, {
      move: bestmove,
      turn: command.player,
      position: chess.fen(),
    });
    game.publish(
      new MovePlayedEvent(game.id, bestmove, command.player, chess.fen()),
    );
  }
}
