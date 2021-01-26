import React from "react";
import {View, Text, StyleSheet, Dimensions, Platform} from "react-native";

import TitleText from "./TitleText";
import Colors from "../constants/colors";

const Header = props => (
    <View 
        style={{
            ...styles.headerBase, 
            ...Platform.select({
                ios: styles.headerIOS, 
                android: styles.headerAndroid
            })
        }}
    >
        <TitleText>{props.title}</TitleText>
    </View>
);

const styles = StyleSheet.create({
    headerBase: {
        width: "100%",
        height: Dimensions.get("window").height * 0.12,
        paddingTop: Dimensions.get("window").height * 0.05,
        paddingBottom: Dimensions.get("window").height * 0.01,
        alignItems: "center",
        justifyContent: "center",
    },
    headerIOS: {
        backgroundColor: "white",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,

    },
    headerAndroid: {
        backgroundColor: Colors.primary,
        borderBottomColor: "transparent",
        borderBottomWidth: 0,
    }
});

export default Header;