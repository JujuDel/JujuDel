export interface IDailyGame {
  white: string;
  black: string;
  url: string;
  fen: string;
  pgn: string;
  turn: string;
  move_by: number;
  draw_offer?: string | null;
  last_activity: number;
  start_time: number;
  time_control: string;
  time_class: string;
  rules: string;    
  tournament?: string; 
  match?: string;
}

export interface IDailyGames {
  games: IDailyGame[];
}

export interface IDailyGamesResponse {
  body: IDailyGames;
  statusCode: number;
}

export interface IConvertedDailyGameObject {
  black: string;
  end_time: string;
  isWhite: boolean;
  noGame: boolean;
  position: Array<Array<string>>;
  white: string;
}
