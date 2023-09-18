// Packages
import WebApiRequest from '../request/_webapi-request.js';
import HttpManager from '../request/_http-manager.js';

// Types
import {
  IDailyGame,
  IDailyGames,
  IDailyGamesResponse,
} from '../types/_daily';
import { Environment } from '../helpers/_environment';
import { MOCKED_CHESS_PLAYER_CURRENT_DAILY_CHESS_RESPONSE } from '../data/_chess';
import {
  IArchiveResponse,
  IFinishedGame,
  IFinishedGames,
  IFinishedGamesResponse,
} from '../types/_finished';

/**
 * Default value for current daily games with no available games.
 */
const defaultCurrentDailyGames: IDailyGames = {
  games: [] as IDailyGame[],
};

/**
 * Requests current daily games from Chess.com.
 *
 * @returns {Promise<IDailyGames>} Object with array of game objects.
 */
const getCurrentGames = async (): Promise<IDailyGames> =>{
  if (Environment.useMockData()) {
    return MOCKED_CHESS_PLAYER_CURRENT_DAILY_CHESS_RESPONSE;
  }

  const response: IDailyGamesResponse = await WebApiRequest.builder()
    .withPath(`/pub/player/${Environment.getChessUsername()}/games`)
    .withHeaders({'User-Agent': Environment.getEmail()})
    .build()
    .execute(HttpManager.get);
  
  const { statusCode } = response;

  if (statusCode === 200) {
    return response.body;
  } else {
    return defaultCurrentDailyGames;
  }
};

/**
 * Default value for current daily games with no available games.
 */
const defaultLastFinishedGames: IFinishedGames = {
  games: [] as IFinishedGame[],
};

/**
 * Requests current daily games from Chess.com.
 *
 * @returns {Promise<IFinishedGames>} Object with array of game objects.
 */
const getLastArchivedGames = async (): Promise<IFinishedGames> =>{
  if (Environment.useMockData()) {
    return defaultLastFinishedGames;
  }

  // Get the game archives
  const response_archive: IArchiveResponse = await WebApiRequest.builder()
    .withPath(`/pub/player/${Environment.getChessUsername()}/games/archives`)
    .withHeaders({'User-Agent': Environment.getEmail()})
    .build()
    .execute(HttpManager.get);
  
  if (response_archive.statusCode !== 200) {
    return defaultLastFinishedGames;
  }

  // Get last month in the archive
  const url_last_month = response_archive.body.archives[response_archive.body.archives.length - 1];

  // TODO: Extend the search if not "enough" games were played last month
  // Get the games played this month
  const response_games: IFinishedGamesResponse = await WebApiRequest.builder()
    .withPath(url_last_month.substring('https://api.chess.com'.length))
    .withHeaders({'User-Agent': Environment.getEmail()})
    .build()
    .execute(HttpManager.get);

  if (response_games.statusCode === 200) {
    return response_games.body;
  } else {
    return defaultLastFinishedGames;
  }
};

export default {
  getCurrentGames,
  getLastArchivedGames,
};
