import React, { useState } from "react";
import {
  FOOD_INITIAL_POSITION,
  SNAKE_INITIAL_POSITION,
  SCORE_INCREMENT,
} from "../constants/game";
import { Bounds } from "../types/game";
import { Coordinate, Direction } from "../types/types";
import getNextHead from "../utils/moveSnake";
import { checkGameOver } from "../utils/checkGameOver";
import checkEatsFood from "../utils/checkEatsFood";
import randomFoodPosition from "../utils/randomFoodPosition";

interface UseSnakeProps {
  bounds: Bounds;
}

export default function useSnake({ bounds }: UseSnakeProps) {
  
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [direction, setDirection] = useState(Direction.Right);
  const [isGameOver, setIsGameOver] = useState(false);

  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [score, setScore] = useState<number>(0);

  const moveSnake = React.useCallback(() => {
    
    setSnake((prev) => {
      const head = prev[0];
      //direction ပေါ်မူတည်ပြီးတော့  head ကို  1  ပေါင်း နှုက်လုပ်တယ်
      const newHead = getNextHead(head, direction);
      
      //game က   bound ကို ထိသွားပြီလား စစ်တယ်
      const gameOver = checkGameOver(newHead, bounds);
      //head က bound ကိုထိသွားရင်  gameOver ture ဖြစ်ပြီး   game က move မလုပ်တော့ပဲ ရပ်သွား
      if (gameOver) {
        setIsGameOver(true);
        return prev;
      }

      //snake head က  fruit ကို စားလား စစ်တယ်
      //စားရင်   true ပြန်လာပြီးတော့  if block ထဲဝင်လုပ်ပြီး ဆက်သွား
      if (checkEatsFood(newHead, food, 2)) {
        //  fruit ကို နေရာ  ကျပန်း အသစ်တစ်ခုမှာ နေရာချပေးတာ
        setFood(randomFoodPosition(bounds.xMax, bounds.yMax));
        //တစ်ခါစားပြီးတိုင်း  score  ကို  SCORE_INCREMENT နဲ့ပေါင်းပြီး  score  ကို update လုပ်
        setScore((prevScore) => SCORE_INCREMENT + prevScore);
        return [newHead, ...prev];
      }//မစားရင်  else  ကိုလုပ် 
      else
         return [newHead, ...prev.slice(0, -1)];
    });
  }, [direction, bounds, food]);

  return {
    food,
    setFood,
    score,
    setScore,
    snake,
    setSnake,
    direction,
    setDirection,
    isGameOver,
    setIsGameOver,
    moveSnake,
  };
}
