export const WIN_RESULTS: string[] = [
  "win"
];
export const LOSE_RESULTS: string[] = [
  "checkmated", "timeout", "resigned", "lose", "abandoned", "kingofthehill", "timevsinsufficient"
];
export const DRAW_RESULTS: string[] = [
  "agreed", "repetition", "stalemate", "insufficient", "50move"
];

export interface IPlayer {
  username: string;
  rating: number;
  result: string;
  '@id': string;
}
export interface IAccuracy {
  white: number;
  black: number;
}
export interface IFinishedGame {
  white: IPlayer;
  black: IPlayer;
  accuracies: IAccuracy;
  url: string;
  fen: string;
  pgn: string;
  start_time: number;
  end_time: number;
  time_class: string;
  time_control: string;
  rules: string;
  eco?: string;    
  tournament?: string; 
  match?: string;
}
export interface IFinishedGames {
  games: IFinishedGame[];
}
export interface IFinishedGamesResponse {
  body: IFinishedGames;
  statusCode: number;
}

export interface IArchives {
  archives: string[];
}
export interface IArchiveResponse {
  body: IArchives;
  statusCode: number;
}

export interface IConvertedFinishedGameObject {
  black: IPlayer;
  end_time: string;
  isWhite: boolean;
  noGame: boolean;
  position: Array<Array<string>>;
  time_class: string;
  white: IPlayer;
}
