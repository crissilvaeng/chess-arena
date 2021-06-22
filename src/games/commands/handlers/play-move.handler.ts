import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Chess } from 'chess.js';
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
  ) {}

  async execute(command: PlayMoveCommand) {
    const game = this.publisher.mergeObjectContext(
      await this.repository.findById(command.game),
    );
    const chess = new Chess();
    game.moves.map((move) => chess.move(move, { sloppy: true }));
    if (chess.game_over()) {
      return;
    }
    const search = await this.broker.request<SearchResult>({
      exchange: 'games.exchange',
      routingKey: game[command.turn].replace(/[^a-zA-Z0-9]/, '-'),
      payload: {
        position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        movetime: 500,
        moves: game.moves,
      },
      timeout: 50000,
    });
    await this.repository.add(game.id, search.bestmove);
    game.publish(new MovePlayedEvent(game.id, command.turn, search.bestmove));
  }
}
