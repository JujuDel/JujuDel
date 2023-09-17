// Packages
import React from 'react';

// Local Imports
import ConvertSVG from '../general/_ConvertSVG';
import { CURRENT_GAMES_CSS } from './config';
import Text from '../general/_Text';

// Types
import { IConvertedFinishedGameObject } from '../../types/_finished';

interface IFinishedGamesParameters {
  games: IConvertedFinishedGameObject[];
  pieceImages: Record<string, string>;
}

/**
 * Returns image of three chess game positions.
 *
 * @param {IConvertedFinishedGameObject[]} games Games to be displayed.
 * @param {Record<string, string>} pieceImages base64 images of pieces.
 * @returns {React.FC} Functional React component.
 */
export const LastGames: React.FC<IFinishedGamesParameters> = ({
  games,
  pieceImages,
}: IFinishedGamesParameters) => {
  return (
    <ConvertSVG
      height="246"
      width="600">
      <Text
        id="title"
        size="title"
        weight="bold">
        { !games[0].noGame ? 'Last played games' : 'Something went wrong' }
      </Text>
      
      <div className="games-wrapper">
        {games.map((game, gameIndex) => (
          <div
            key={ `chess-game-${gameIndex}` }
            className="game">
            <div className="board">
              {game.position.map((row, rowIndex) => (
              <div
                key={`chess-game-${ gameIndex }-row-${ rowIndex }`}
                className="row">
                {row.map((col, colIndex) => (
                <div
                  key={`chess-game-${ gameIndex }=row-${ rowIndex }-col-${ colIndex }`}
                  className={`col ${(rowIndex + colIndex) % 2 === (game.isWhite ? 0 : 1) ? 'light' : ''} ${game.noGame ? 'empty' : ''}`}>
                  {col && 
                    <img src={ pieceImages[`${col === col.toUpperCase() ? 'white' : 'black' }-${ col.toLowerCase() }`]}></img>
                  }
                </div>
                ))}
              </div>
              ))}
            </div>

            {!game.noGame && (
              <Text className="username" color="grey-lighter">
                { game.isWhite ? game.white.result : game.black.result } vs. { game.isWhite ? game.black.username : game.white.username } ({ game.isWhite ? game.black.rating : game.white.rating })
              </Text>
            )}
          </div>
        ))}
      </div>
      
      <style>
        { CURRENT_GAMES_CSS }
      </style>
    </ConvertSVG>
  );
};
