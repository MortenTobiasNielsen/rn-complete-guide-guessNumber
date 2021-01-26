import React from "react";
import {Text, StyleSheet, Dimensions} from "react-native";

import StandardFonts from "../constants/fonts";

const TitleText = props => <Text style={styles.title}>{props.children}</Text>;

const styles = StyleSheet.create({
    title: {
        fontFamily: StandardFonts.openSansBold,
        fontSize: Dimensions.get("window").height * 0.035,
        marginVertical: Dimensions.get("window").height * 0.015,
        color: Platform.OS === "ios" ? "black" : "white",
    }
});

export default TitleText;