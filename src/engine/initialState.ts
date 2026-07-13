import { Direction } from "../types/types";
import { GameState } from "./gameTypes";

export const initialState : GameState ={
    snake:[{x:5, y:5}],
    food:{x:5,y:20},
    direction: Direction.Right,
    isPaused : false ,
    isGameOver:false
}