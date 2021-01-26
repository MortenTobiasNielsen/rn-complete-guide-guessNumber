import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";

import Colors from "../constants/colors";
import StandardFonts from "../constants/fonts";

const MainButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: Dimensions.get("window").height * 0.018,
        paddingHorizontal: Dimensions.get("window").height * 0.05,
        borderRadius: Dimensions.get("window").height * 0.035,
    },
    buttonText: {
        color: "white",
        fontFamily: StandardFonts.openSans,
        fontSize: Dimensions.get("window").height * 0.03,
    },
});

export default MainButton;