import React, {useState, useRef, useEffect} from "react";
import {View, Text, StyleSheet, Button, Alert} from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";

const LowNumber = 1;
const HighNumber = 100;

const generateRandomBetween = (min, max, exclude) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude ) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    };
};

const GameScreen = props => {
    const { userChoice, onGameOver} = props;
    const currentLow = useRef(LowNumber); // Used instead of state to prevent re-render
    const currentHigh = useRef(HighNumber); // Used instead of state to prevent re-render
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(LowNumber, HighNumber, userChoice));
    const [rounds, setRounds] = useState(0);


    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        };
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if (direction === "lower" && currentGuess < userChoice ||
            direction === "greater" && currentGuess > userChoice) {
            Alert.alert("Don't cheat!", "You know that this is wrong...", [
                {text: "Sorry!", style: "cancel"}
            ]);
            return;
        }

        if (direction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        setCurrentGuess(generateRandomBetween(currentLow.current, currentHigh.current, currentGuess));
        setRounds(rounds => rounds + 1)
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <View>
                    <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                        LOWER
                    </MainButton>
                </View>
                <View>
                    <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
                        GREATER
                    </MainButton>
                </View>
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        width: 400,
        maxWidth: "90%"
    }
});

export default GameScreen;