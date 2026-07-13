import { Coordinate, Direction } from "../types/types";

export interface GameState {
  snake: Coordinate[];
  food: Coordinate;
  direction: Direction;
  isPaused: boolean;
  isGameOver: boolean;
}

export type GameAction =
  | { type: "MOVE" }
  | { type: "CHANGE_DIRECTION"; payload: Direction }
  | { type: "GAME_OVER" }
  | { type: "RESET" };
