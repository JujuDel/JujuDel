// Local Imports
import {
  CHESS_COLORS,
  CHESS_PIECES,
  EMPTY_CHESS_BOARD_FEN,
  GITHUB_CHESS_IMAGES_DIRECTORY_URL,
} from '../config';
import { Environment } from './_environment';
import { getImageData } from './_image';

// Types
import {
  IConvertedDailyGameObject,
  IDailyGame,
} from '../types/_daily';
import {
  IConvertedFinishedGameObject,
  IFinishedGame,
  WIN_RESULTS,
  LOSE_RESULTS,
} from '../types/_finished';

/**
 * 
 * @param {number} timestamp number of seconds since the Unix Epoch
 * @returns {string} Readable timestamp in the form yyyy-mm-dd hh:mm:ss
 */
function timestampToReadableDate(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Converts recieved game objects to simplified objects.
 *
 * @param {IDailyGame} game Recieved game object.
 * @returns {IConvertedDailyGameObject} Converted game object.
 */
export const convertDailyGameObject = (game: IDailyGame): IConvertedDailyGameObject => {
  const isWhite: boolean = game.white.includes(Environment.getChessUsername());
  const white: string = (game.white.split('/').reverse())[0];
  const black: string = (game.black.split('/').reverse())[0];

  return {
    black,
    end_time: null,
    isWhite,
    noGame: false,
    position: convertFenToArray(isWhite, game.fen),
    white,
  };
};

/**
 * Converts recieved game objects to simplified objects.
 *
 * @param {IFinishedGame} game Recieved game object.
 * @returns {IConvertedFinishedGameObject} Converted game object.
 */
export const convertFinishedGameObject = (game: IFinishedGame): IConvertedFinishedGameObject => {
  const isWhite: boolean = game.white.username === Environment.getChessUsername();

  if (WIN_RESULTS.includes(game.black.result)) {
    game.black.result = "WIN";
    game.white.result = "LOSE";
  } else if (LOSE_RESULTS.includes(game.black.result)) {
    game.black.result = "LOSE";
    game.white.result = "WIN";
  } else {
    game.black.result = "DRAW";
    game.white.result = "DRAW";
  }

  return {
    black: game.black,
    end_time: timestampToReadableDate(game.end_time),
    isWhite,
    noGame: false,
    position: convertFenToArray(isWhite, game.fen),
    white: game.white,
  };
};

/**
 * Creates an empty game object.
 *
 * @returns {IConvertedDailyGameObject | IConvertedFinishedGameObject} Empty game object.
 */
export const createEmptyGameObject = (): IConvertedDailyGameObject | IConvertedFinishedGameObject => ({
  black: null,
  end_time: null,
  isWhite: true,
  noGame: true,
  position: convertFenToArray(true, EMPTY_CHESS_BOARD_FEN),
  white: null,
});

/**
 * Returns an nice lil' array of the position.
 *
 * @param {boolean} isWhite Is main player playing the white pieces?
 * @param {string} fen The FEN string.
 * @returns {(string | null)[][]} Array of positon.
 */
export const convertFenToArray = (isWhite: boolean, fen: string): (string | null)[][] => {
  const finalPosition: (string | null)[][] = [];

  const position: string = fen.slice(0, fen.indexOf(' '));
  const rows: string[] = position.split('/');

  if (!isWhite) {
    rows.reverse();
  }

  for (let i = 0; i < rows.length; i++) {
    finalPosition.push([]);
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] >= '1' && rows[i][j] <= '9') {
        for (let k = 0; k < parseInt(rows[i][j], 10); k++) {
          finalPosition[i].push(null);
        }
      } else {
        finalPosition[i].push(rows[i][j]);
      }
    }
    if (!isWhite) {
      finalPosition[i].reverse();
    }
  }

  return finalPosition;
}

/**
 * Loads the images into a buffer, only does this once per image.
 */
export const getPieces = async (): Promise<object> => {
  const pieceImages = {};

  for (const color of CHESS_COLORS) {
    for (const piece of CHESS_PIECES) {
      pieceImages[`${color}-${piece}`] = await getImageData(`${GITHUB_CHESS_IMAGES_DIRECTORY_URL}${color}-${piece}.png`);
    }
  }

  return pieceImages;
};
