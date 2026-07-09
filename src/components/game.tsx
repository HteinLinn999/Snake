import * as React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../styles/colors";
//import { PanGestureHandler } from "react-native-gesture-handler";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Coordinate, Direction, GestureEventType } from "../types/types";
import { Dimensions } from "react-native";
import Snake from "./Snake";
import { CELL_SIZE, BORDER_WIDTH, MOVE_INTERVAL } from "../constants/game";

//refactoing 
import { checkGameOver } from "../utils/checkGameOver";
import getNextHead from "../utils/moveSnake";




const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
//const GAME_BOUNDS = { xMin: 0, xMax: 22, yMin: 0, yMax: 46 };const MOVE_INTERVAL = 50;
// const { width, height } = Dimensions.get("window");

export default function Game(): React.JSX.Element {

    const [direction, setDirection] = React.useState<Direction>(Direction.Right);
    const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);

    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);

    const [gameSize, setGameSize] = React.useState({
        width: 0,
        height: 0
    });

    const GAME_BOUNDS = React.useMemo(() => ({
        xMin: 0,
        xMax:
            Math.floor(
                (gameSize.width - BORDER_WIDTH * 2) / CELL_SIZE
            ),
        yMin: 0,
        yMax:
            Math.floor(
                (gameSize.height - BORDER_WIDTH * 2) / CELL_SIZE
            )
    }), [gameSize]);


    const moveSnake = React.useCallback(() => {

        setSnake(prev => {

            const head = prev[0];
            const newHead = getNextHead(head, direction);
            const gameOver = checkGameOver(newHead, GAME_BOUNDS);

            if (gameOver) {
                setIsGameOver(true);
                return prev;
            }

            return [
                newHead,
                ...prev.slice(0, -1),
            ];
        });
    }, [direction, GAME_BOUNDS]);


    React.useEffect(() => {
        if (
            isGameOver ||
            isPaused ||
            gameSize.width === 0
        ) {
            return;
        }

        const timer = setInterval(
            moveSnake,
            MOVE_INTERVAL
        );

        return () => clearInterval(timer);

    }, [
        moveSnake,
        isGameOver,
        isPaused,
        gameSize
    ]);
    
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
                    <View
                        style={styles.boundaries}
                        onLayout={(event) => {
                            const { width, height } =event.nativeEvent.layout;
                            setGameSize({
                                width,
                                height
                            });

                        }}
                    >
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