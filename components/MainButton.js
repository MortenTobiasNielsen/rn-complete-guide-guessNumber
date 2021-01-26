import React from "react";
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TouchableNativeFeedback, 
    Dimensions,
    Platform,
} from "react-native";

import Colors from "../constants/colors";
import StandardFonts from "../constants/fonts";

const MainButton = props => {
    let ButtonComponent = TouchableOpacity;

    if (Platform.OS === "android" && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }

    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: Dimensions.get("window").height * 0.035,
        overflow: "hidden"
    },
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