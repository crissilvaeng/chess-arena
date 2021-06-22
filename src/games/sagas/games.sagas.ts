import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Color } from '../constants';
import { CreatePlayerCommand } from '../commands/create-player.command';
import { GameCreatedEvent } from '../events/game-created.event';
import { GameStartedEvent } from '../events/game-started.event';
import { Injectable } from '@nestjs/common';
import { MovePlayedEvent } from '../events/move-played.event';
import { PlayMoveCommand } from '../commands/play-move.command';
import { PlayerCreatedEvent } from '../events/player-created.event';
import { PublishNotificationCommand } from '../commands/publish-notification.command';
import { StartGameCommand } from '../commands/start-game.command';

@Injectable()
export class GameSagas {
  @Saga()
  gameCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(GameCreatedEvent),
      mergeMap((event) =>
        of(
          new CreatePlayerCommand(event.id, Color.White, event.white),
          new CreatePlayerCommand(event.id, Color.Black, event.black),
        ),
      ),
    );
  };

  @Saga()
  playerStarted = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PlayerCreatedEvent),
      map((event) => {
        if (event.player === Color.White) {
          return new StartGameCommand(event.id);
        }
      }),
    );
  };

  @Saga()
  gameStarted = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(GameStartedEvent),
      map((event) => new PlayMoveCommand(event.id, Color.White)),
    );
  };

  @Saga()
  movePlayed = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MovePlayedEvent),
      map(
        (event) =>
          new PlayMoveCommand(
            event.id,
            event.player === Color.White ? Color.Black : Color.White,
          ),
      ),
    );
  };

  @Saga()
  playerCreatedNotify = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PlayerCreatedEvent),
      map(
        (event) =>
          new PublishNotificationCommand(
            `games.${event.id}.player-created`,
            event,
          ),
      ),
    );
  };

  @Saga()
  gameStartedNotify = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(GameStartedEvent),
      map(
        (event) =>
          new PublishNotificationCommand(
            `games.${event.id}.game-started`,
            event,
          ),
      ),
    );
  };

  @Saga()
  movePlayedNotify = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MovePlayedEvent),
      map(
        (event) =>
          new PublishNotificationCommand(
            `games.${event.id}.move-played`,
            event,
          ),
      ),
    );
  };
}
