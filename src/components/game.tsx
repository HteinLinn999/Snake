import * as React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../styles/colors";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Coordinate, Direction, GestureEventType } from "../types/types";
import Snake from "./Snake";
import {
    CELL_SIZE,
    BORDER_WIDTH,
    MOVE_INTERVAL,
    FOOD_INITIAL_POSITION
} from "../constants/game";
import useGameLoop from "../hooks/useGameLoop";
import useSnake from "../hooks/useSnake";
import Food from "./Food";

export default function Game(): React.JSX.Element {

    const [isPaused, setIsPaused] = React.useState<boolean>(false);
    const [gameSize, setGameSize] = React.useState({
        width: 0,
        height: 0
    });

    //
    //xMin,xMax, yMin,yMax  စတာတွေက  screen width , height ပြောင်းမှ ပဲ တွက်ချက်ဖို့လိုတာပါ
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

    const {
        snake,
        direction,
        setDirection,
        moveSnake,
        isGameOver,
        food,
    } = useSnake({
        bounds: GAME_BOUNDS,
    });

    useGameLoop({
        callback: moveSnake,
        interval: MOVE_INTERVAL,
        enabled:
            !isGameOver &&
            !isPaused &&
            gameSize.width > 0,
    });


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
                            const { width, height } = event.nativeEvent.layout;
                            setGameSize({ width, height });
                        }}
                    >
                        <Snake snake={snake} />
                        <Food x={food.x} y={food.y} />
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