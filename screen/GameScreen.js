import React, {useState, useRef, useEffect} from "react";
import {View, Text, StyleSheet, Button, Alert} from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

const GameScreen = props => {
    const { userChoice, onGameOver} = props;
    const currentLow = useRef(1); // Used instead of state to prevent re-render
    const currentHigh = useRef(100); // Used instead of state to prevent re-render
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(currentLow.current, currentHigh.current, userChoice)
    );
    const [rounds, setRounds] = useState(0);


    useEffect(() => {
        console.log(currentGuess);
        console.log(userChoice);
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
            currentLow.current = currentGuess;
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
                    <Button title="LOWER" onPress={nextGuessHandler.bind(this, "lower")}/>
                </View>
                <View>
                    <Button title="GREATER" onPress={nextGuessHandler.bind(this, "greater")}/>
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
        width: 300,
        maxWidth: "80%"
    }
});

export default GameScreen;