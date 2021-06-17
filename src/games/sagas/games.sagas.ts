import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, of } from 'rxjs';

import { CreatePlayerCommand } from '../commands/create-player.command';
import { GameCreatedEvent } from '../events/game-created.event';
import { Injectable } from '@nestjs/common';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class GameSagas {
  @Saga()
  gameCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(GameCreatedEvent),
      mergeMap((event) =>
        of(
          new CreatePlayerCommand(event.gameId, event.whiteImage),
          new CreatePlayerCommand(event.gameId, event.blackImage),
        ),
      ),
    );
  };
}
