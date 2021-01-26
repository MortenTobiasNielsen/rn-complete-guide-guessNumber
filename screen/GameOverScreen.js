import React from "react";
import {
    View, 
    Text, 
    StyleSheet, 
    Button, 
    Image,
    Dimensions,
} from "react-native";

import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                    source={require("../assets/success.png")} // To load a local image
                    // source={{uri: "https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf.jpg"}} // To load an image from the web
                    style={styles.image} 
                    resizeMode="cover"/>
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
            </View>
            <MainButton onPress={props.onRestart}>
                New Game
            </MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: Dimensions.get("window").width * 0.5,
        height: Dimensions.get("window").width * 0.5,
        borderRadius: Dimensions.get("window").height * 0.25,
        borderWidth: 3,
        borderColor: "black",
        overflow: "hidden",
        marginVertical: Dimensions.get("window").height * 0.02,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    resultContainer: {
        width: "80%",
        marginHorizontal: Dimensions.get("window").height * 0.04,
        marginVertical: Dimensions.get("window").height * 0.02,
    },
    resultText: {
        textAlign: "center",
        fontSize: Dimensions.get("window").height / 720 * 20,
    },
    highlight: {
        color: Colors.primary,
        fontFamily: "open-sans-bold"

    }
});

export default GameOverScreen;