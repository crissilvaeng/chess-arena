import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { CreatePlayerCommand } from '../commands/create-player.command';
import { GameCreatedEvent } from '../events/game-created.event';
import { Injectable } from '@nestjs/common';
import { MovePlayedEvent } from '../events/move-played.event';
import { PlayMoveCommand } from '../commands/play-move.command';

@Injectable()
export class GameSagas {
  @Saga()
  gameCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(GameCreatedEvent),
      mergeMap((event) =>
        of(
          new CreatePlayerCommand(event.gameId, 'white', event.whiteImage),
          new CreatePlayerCommand(event.gameId, 'black', event.blackImage),
          new PlayMoveCommand(event.gameId, 'white'),
        ),
      ),
    );
  };

  @Saga()
  movePlayed = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MovePlayedEvent),
      map(
        (event) =>
          new PlayMoveCommand(
            event.game,
            event.player === 'white' ? 'black' : 'white',
          ),
      ),
    );
  };
}
