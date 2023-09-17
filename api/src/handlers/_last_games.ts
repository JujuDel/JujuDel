// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';
import { renderToString } from 'react-dom/server';

// Local Imports
import {
  getPieces,
  convertFinishedGameObject,
  createEmptyGameObject,
} from '../helpers/_chess';
import { convertToImageResponse } from '../helpers/_image';
import { LastGames } from '../components/chess/_LastGames';
import api from '../api';

// Types
import { IConvertedFinishedGameObject } from '../types/_finished';

/**
 * Returns an image displaying three of my current chess games from Chess.com.
 *
 * @param {VercelRequest} req Request for image.
 * @param {VercelResponse} res Response to request.
 */
export default async function (
  req: VercelRequest,
  res: VercelResponse,
) {
  const pieceImages: object = await getPieces();

  // Using an awesome library called chess-web-api to get our data ;)
  const lastGames = (await api.chess.getLastArchivedGames()).games.reverse();

  // Limiting the width of the games.
  lastGames.length = Math.min(
    lastGames.length,
    3,
  );

  // There's a lot of data we don't need! Converting the FEN to an array
  const convertedCurrentGames: IConvertedFinishedGameObject[] = await Promise.all([
    ...lastGames.map(convertFinishedGameObject),
  ]);

  // Adding empty spots if there aren't 3!
  for (let i = convertedCurrentGames.length; i < 3; i++) {
    convertedCurrentGames.push(createEmptyGameObject() as IConvertedFinishedGameObject);
  }

  // Hey! I'm returning an image!
  convertToImageResponse(res);

  // Generating the component and rendering it
  const text: string = renderToString(
    LastGames({
      games: convertedCurrentGames,
      pieceImages: pieceImages,
    }),
  );

  return res.send(text);
}
