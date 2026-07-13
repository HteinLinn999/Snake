import { StyleSheet, Text, View } from "react-native";
import { Coordinate } from "../types/types";
import React, { useEffect, useState } from "react";
import { CELL_SIZE } from "../constants/game";

function getRandomFruitEmoji() {
    const fruitEmojis = ["🍎", "🍊", "🍋", "🍇", "🍉", "🍓", "🍑", "🍍"];
    const randomIndex = Math.floor(Math.random() * fruitEmojis.length);
    return fruitEmojis[randomIndex];
}

export default function Food({ x, y }: Coordinate): React.JSX.Element {

    const [emoji, setEmoji] = useState("🍎");

    useEffect(() => {
        const newEmoji = getRandomFruitEmoji();
        setEmoji(newEmoji);
        //setEmoji(getRandomFruitEmoji(););
    }, [x,y])


    return <Text style={[{ top: y * CELL_SIZE, left: x * CELL_SIZE }, styles.food]}>{emoji}</Text>;
}

const styles = StyleSheet.create({
    food: {
        width: 20,
        height: 20,
        borderRadius: 7,
        position: "absolute",              
    },
});