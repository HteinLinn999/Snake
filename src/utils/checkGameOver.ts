import { Coordinate } from "../types/types";
import { Bounds } from "../types/game";
export const checkGameOver = (
  snakeHead: Coordinate,
  boundaries: Bounds,
): boolean => {
  return (
    snakeHead.x < boundaries.xMin ||
    snakeHead.x > boundaries.xMax ||
    snakeHead.y < boundaries.yMin ||
    snakeHead.y > boundaries.yMax
  );
};
