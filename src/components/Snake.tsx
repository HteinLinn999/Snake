import { Fragment, JSX } from "react";
import { Coordinate } from "../types/types";
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles/colors";
import { CELL_SIZE } from "../constants/game";

interface SnakeProps {
    snake: Coordinate[];
}
export default function Snake({ snake }: SnakeProps): JSX.Element {

    return (
        <Fragment>
            {snake.map((segment: Coordinate, index: number) => {
                const segmentStyle = {
                    left: segment.x * CELL_SIZE,
                    top: segment.y * CELL_SIZE,
                }
                return <View
                    key={index}
                    style={[styles.snake, segmentStyle]}
                />
            })}
        </Fragment>
    );
}

const styles = StyleSheet.create({
    snake: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        backgroundColor: Colors.primary,
        position: "absolute",
        borderRadius: CELL_SIZE /2,
    }
})