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
 * @param {string} username The chess username to query the game for.
 * @returns {Promise<IDailyGames>} Object with array of game objects.
 */
const getCurrentGames = async (username: string): Promise<IDailyGames> =>{
  if (Environment.useMockData()) {
    return MOCKED_CHESS_PLAYER_CURRENT_DAILY_CHESS_RESPONSE;
  }

  try
  {
    const response: IDailyGamesResponse = await WebApiRequest.builder()
      .withPath(`/pub/player/${username}/games`)
      .withHeaders({'User-Agent': Environment.getEmail()})
      .build()
      .execute(HttpManager.get);

    if (response.statusCode === 200) {
      return response.body;
    } else {
      return defaultCurrentDailyGames;
    }
  }
  catch (error) {
    if (error.statusCode === 404) {
      throw new Error('404');
    }
    throw error;
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
 * @param {string} username The chess username to query the game for.
 * @returns {Promise<IFinishedGames>} Object with array of game objects.
 */
const getLastArchivedGames = async (username: string): Promise<IFinishedGames> =>{
  if (Environment.useMockData()) {
    return defaultLastFinishedGames;
  }

  try {
    // Get the game archives
    const response_archive: IArchiveResponse = await WebApiRequest.builder()
      .withPath(`/pub/player/${username}/games/archives`)
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
  }
  catch (error) {
    if (error.statusCode === 404) {
      throw new Error('404');
    }
    throw error;
  }
};

export default {
  getCurrentGames,
  getLastArchivedGames,
};
