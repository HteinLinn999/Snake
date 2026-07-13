import { Coordinate } from "../types/types";

const randomFoodPosition = (maxX: number, maxY: number): Coordinate => {
  return {
    x: Math.floor(Math.random() * maxX),
    y: Math.floor(Math.random() * maxY),
  };
};

export default randomFoodPosition;

// import { Coordinate } from "../types/types";


// const randomFoodPosition = (
//   maxX:number,
//   maxY:number,
//   snake:Coordinate[]
// ):Coordinate => {

//   let newFood:Coordinate;


//   do {

//     newFood = {
//       x: Math.floor(Math.random() * maxX),
//       y: Math.floor(Math.random() * maxY),
//     };


//   } while(
//     snake.some(
//       segment =>
//         segment.x === newFood.x &&
//         segment.y === newFood.y
//     )
//   );


//   return newFood;
// };


// export default randomFoodPosition;