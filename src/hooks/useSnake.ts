import React, { useState } from "react";
import { SNAKE_INITIAL_POSITION } from "../constants/game";
import { Bounds } from "../types/game";
import { Coordinate, Direction } from "../types/types";
import getNextHead from "../utils/moveSnake";
import { checkGameOver } from "../utils/checkGameOver";

interface UseSnakeProps {
  bounds: Bounds;
}

export default function useSnake({ bounds }: UseSnakeProps) {
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [direction, setDirection] = useState(Direction.Right);
  const [isGameOver, setIsGameOver] = useState(false);

  const moveSnake = React.useCallback(() => {
    setSnake((prev) => {
      const head = prev[0];
      const newHead = getNextHead(head, direction);
      const gameOver = checkGameOver(newHead, bounds);

      if (gameOver) {
        setIsGameOver(true);
        return prev;
      }

      return [newHead, ...prev.slice(0, -1)];
    });
  }, [direction, bounds]);

  return {
    snake,
    direction,
    setDirection,
    moveSnake,
    isGameOver,
    setIsGameOver,
  };
}
