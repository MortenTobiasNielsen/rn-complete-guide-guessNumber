import React from "react";
import {View, Text, StyleSheet, Dimensions, Platform} from "react-native";

import TitleText from "./TitleText";
import Colors from "../constants/colors";

const Header = props => (
    <View style={styles.header}>
        <TitleText>{props.title}</TitleText>
    </View>
);

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: Dimensions.get("window").height * 0.12,
        paddingTop: Dimensions.get("window").height * 0.05,
        paddingBottom: Dimensions.get("window").height * 0.01,
        backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: Platform.OS === "ios" ? "#ccc" : "transparent",
        borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
    },
});

export default Header;