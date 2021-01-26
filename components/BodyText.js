import React from "react";
import {Text, StyleSheet} from "react-native";

import StandardFonts from "../constants/fonts";

const BodyText = props => <Text style={styles.body}>{props.children}</Text>;

const styles = StyleSheet.create({
    body: {
        fontFamily: StandardFonts.openSans,
    }
});

export default BodyText;