import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../styles/colors";
//import { PanGestureHandler } from "react-native-gesture-handler";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Coordinate, Direction, GestureEventType } from "../types/types";
import { Dimensions } from "react-native";
import Snake from "./Snake";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
// const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

const CELL_SIZE = 10;
const { width, height } = Dimensions.get("window");
const GAME_BOUNDS = {
    xMin: 0,
    xMax: Math.floor(width / CELL_SIZE),
    yMin: 0,
    yMax: Math.floor(height / CELL_SIZE),
};

export default function Game(): React.JSX.Element {

    const [direction, setDirection] = React.useState<Direction>(Direction.Right);
    const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);

    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!isGameOver) {
            const intervalId = setInterval(() => {
                !isPaused && moveSnake();
            }, MOVE_INTERVAL)

            return () => clearInterval(intervalId);
        }
    }, [snake, isGameOver, isPaused]);

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead };//create a copy        

        //game  over

        switch (direction) {
            case Direction.Up: newHead.y -= 1; break;
            case Direction.Down: newHead.y += 1; break;
            case Direction.Left: newHead.x -= 1; break;
            case Direction.Right: newHead.x += 1; break;
            default:
                break;
        }
        setSnake(prev => [
            newHead,
            ...prev.slice(0, -1),
        ]);
    }

    const handleGesture = (event: GestureEventType) => {
        const { translationX, translationY } = event;
        if (Math.abs(translationX) > Math.abs(translationY)) {

            if (translationX > 0) {
                setDirection(Direction.Right);
            } else {
                setDirection(Direction.Left);
            }

        } else {
            if (translationY > 0) {
                setDirection(Direction.Down);

            } else {
                setDirection(Direction.Up);

            }
        }
    }

    const pan = Gesture.Pan()
        .onUpdate(handleGesture);

    return (
        <GestureDetector gesture={pan}>
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }} >
                    <View style={styles.boundaries}>
                        <Snake snake={snake} />
                    </View>
                </SafeAreaView>
            </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    boundaries: {
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: Colors.background,
    }
});