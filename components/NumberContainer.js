import React from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";

import Colors from "../constants/colors";

const NumberContainer = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.accent,
        padding: Dimensions.get("window").height * 0.015,
        borderRadius: Dimensions.get("window").height * 0.015,
        marginVertical: Dimensions.get("window").height * 0.015,
        alignItems: "center",
        justifyContent: "center"
    },
    number: {
        color: Colors.accent,
        fontSize: Dimensions.get("window").height * 0.05,
    }
});

export default NumberContainer;