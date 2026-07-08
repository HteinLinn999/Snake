import { Coordinate } from "../types/types";

interface Bounds {
    xMin:number;
    xMax:number;
    yMin:number;
    yMax:number;
}


export const checkGameOver = (
    snakeHead: Coordinate,
    boundaries:Bounds
):boolean=>{
    return (
        snakeHead.x < boundaries.xMin ||
        snakeHead.x > boundaries.xMax ||
        snakeHead.y < boundaries.yMin ||
        snakeHead.y > boundaries.yMax
    );
};