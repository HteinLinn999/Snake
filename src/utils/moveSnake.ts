import { Coordinate, Direction } from "../types/types";

 const getNextHead = (
    head: Coordinate,
    direction: Direction
): Coordinate => {

    const newHead = {...head};

    switch(direction){

        case Direction.Up:
            newHead.y -= 1;
            break;


        case Direction.Down:
            newHead.y += 1;
            break;


        case Direction.Left:
            newHead.x -= 1;
            break;


        case Direction.Right:
            newHead.x += 1;
            break;
    }

    return newHead;

};

export default getNextHead;