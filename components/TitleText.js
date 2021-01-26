import React from "react";
import {Text, StyleSheet} from "react-native";

import StandardFonts from "../constants/fonts";

const TitleText = props => <Text style={styles.title}>{props.children}</Text>;

const styles = StyleSheet.create({
    title: {
        fontFamily: StandardFonts.openSansBold,
        fontSize: 18,
        marginVertical: 10
    }
});

export default TitleText;