import { GameAction, GameState } from "./gameTypes";
import { initialState } from "./initialState";

export function gameReducer(state:GameState,action:GameAction): GameState{

    switch( action.type){
        case "RESET": return initialState;
        case "GAME_OVER": return {...state, isGameOver:true};
        case "CHANGE_DIRECTION": return {...state, direction:action.payload};
        case "MOVE": return state;
        default: return state;
    }
}