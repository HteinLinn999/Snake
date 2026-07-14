import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../styles/colors";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

interface HeaderProps {
    children: React.JSX.Element,
    reloadGame: () => void;
    pauseGame: () => void;
    isPaused: boolean;
}

export default function Header({
    children,
    reloadGame,
    pauseGame,
    isPaused
}: HeaderProps): React.JSX.Element {
    return (<View style={styles.container}>
        <TouchableOpacity onPress={reloadGame}>
            <Ionicons name="reload-circle" size={35} color={Colors.primary} />
            {/* <Text style={{ color: Colors.primary, fontSize: 20 }}>Roload</Text> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={pauseGame}>
            <FontAwesome
                name={isPaused ? "play-circle" : "pause-circle"}
                size={35}
                color={Colors.primary}
            />
            {/* <Text style={{ color: Colors.primary, fontSize: 20 }}>{isPaused?"Play":"Pause"}</Text> */}
        </TouchableOpacity>
        {children}
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 0.05,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: Colors.primary,
        borderWidth: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 15,
        backgroundColor: Colors.background,
    }
});