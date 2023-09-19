// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import chessGamesHandler from '../src/handlers/_last_games';
import {
  ERROR_MESSAGE_500,
  ERROR_MESSAGE_500_BAD_USER,
  ERROR_MESSAGE_500_NO_USER,
} from '../src/config';

/**
 * Returns an image displaying three of my current chess games from Chess.com.
 *
 * @param {VercelRequest} req Request for image.
 * @param {VercelResponse} res Response to request.
 */
export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    return await chessGamesHandler(req, res);
  } catch (error) {
    if (error.message === 'Empty username') {
      return res.status(500).send(ERROR_MESSAGE_500_NO_USER);
    }
    else if (error.message === '404') {
      return res.status(404).send(ERROR_MESSAGE_500_BAD_USER);
    }
    else {
      console.error(error);
      return res.status(500).send(ERROR_MESSAGE_500);
    }
  }
}
