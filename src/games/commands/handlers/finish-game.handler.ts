import { Chess, ChessInstance } from 'chess.js';
import { Color, Result, Termination } from 'src/games/constants';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { FinishGameCommand } from '../finish-game.command';
import { GameFinishedEvent } from 'src/games/events/game-finished.event';
import { GameRepository } from 'src/games/repository/game.repository';
import { Outcome } from 'src/games/schemas/outcome.schema';

@CommandHandler(FinishGameCommand)
export class FinishGamneHandler implements ICommandHandler<FinishGameCommand> {
  constructor(
    private readonly repository: GameRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: FinishGameCommand) {
    const chess = new Chess();
    command.moves.map((move) => chess.move(move));
    const { game: id } = command;
    const game = this.publisher.mergeObjectContext(
      await this.repository.update(id, {
        status: 'Closed',
        outcome: this.outcome(chess),
      }),
    );
    game.publish(
      new GameFinishedEvent(
        game.id,
        game.outcome.winner,
        game.outcome.termination,
        game.outcome.result,
      ),
    );
  }

  private outcome(chess: ChessInstance): Outcome {
    const termination = this.getTermination(chess);
    const winner = this.getWinner(chess);
    const result = this.getResult(winner);
    return { termination, winner, result };
  }

  private getResult(winner?: Color): string {
    if (winner === Color.White) return Result.White;
    if (winner === Color.Black) return Result.Black;
    return Result.Draw;
  }

  private getWinner(chess: ChessInstance): Color | null {
    if (chess.game_over() && !chess.in_draw()) {
      if (chess.turn() === 'b') {
        return Color.White;
      }
      if (chess.turn() === 'w') {
        return Color.Black;
      }
    }
  }

  private getTermination(chess: ChessInstance): Termination {
    if (chess.in_checkmate()) return Termination.Checkmate;
    if (chess.in_stalemate()) return Termination.Stalemate;
    if (chess.insufficient_material()) return Termination.InsufficientMaterial;
    if (chess.in_threefold_repetition()) return Termination.ThreefoldRepetition;
    return Termination.FiftyMoves;
  }
}
