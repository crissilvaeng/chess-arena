export enum Color {
  White = 'white',
  Black = 'black',
}

export enum Termination {
  Default = '',
  Checkmate = 'Checkmate',
  Stalemate = 'Stalemate',
  InsufficientMaterial = 'InsufficientMaterial',
  ThreefoldRepetition = 'ThreefoldRepetition',
  FiftyMoves = 'FiftyMoves',
}

export enum Result {
  Default = '*',
  White = '1-0',
  Draw = '1/2-1/2',
  Black = '0-1',
}

export interface Outcome {
  termination: Termination;
  winner?: Color;
  result: string;
}

export const START_FEN: string =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
