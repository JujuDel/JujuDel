import dotenv from 'dotenv';

dotenv.config();

/**
 * Empty FEN used for empty games.
 */
export const EMPTY_CHESS_BOARD_FEN = '8/8/8/8/8/8/8/8/';

/**
 * Location of images.
 */
export const GITHUB_CHESS_IMAGES_DIRECTORY_URL = 'https://raw.githubusercontent.com/JujuDel/JujuDel/master/api/assets/images/';

/**
 * Message for 405 error when not in development environment.
 */
export const ERROR_MESSAGE_405 = 'Endpoint blocked: Not in development environment.';

/**
 * Message for 500 on server error.
 */
export const ERROR_MESSAGE_500 = 'Something went terribly wrong...';

/**
 * Message for 500 on pseudo not passed.
 */
export const ERROR_MESSAGE_500_NO_USER = 'Username not passed. Add it in the URL like e.g. chess-last-games/?username=LuckyJu';

/**
 * Message for 500 on pseudo not found.
 */
export const ERROR_MESSAGE_500_BAD_USER = 'Data for user not found... Does the URL contain existing username? e.g. chess-last-games/?username=LuckyJu';

/**
 * Chess colors for piece images.
 */
export const CHESS_COLORS: string[] = [
  'white',
  'black',
];

/**
 * Chess pieces keys for piece images.
 */
export const CHESS_PIECES: string[] = [
  'b',
  'k',
  'n',
  'p',
  'q',
  'r'
];

/**
 * Lets Github know we're returning an image.
 */
export const IMAGE_RESPONSE_HEADERS: [string, string] = [
  'Content-Type',
  'image/svg+xml',
];

/**
 * Tells the user when to update the image.
 */
export const CACHE_CONTROL_RESPONSE_HEADERS: [string, string] = [
  'Cache-Control',
  's-maxage=1, stale-while-revalidate',
];
