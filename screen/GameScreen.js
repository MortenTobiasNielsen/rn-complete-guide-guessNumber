import React, {useState, useRef, useEffect} from "react";
import {View, Text, StyleSheet, Alert, ScrollView} from "react-native";
import {Ionicons} from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

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

const renderListItem = (value, numOfRounds) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRounds}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
)

const GameScreen = props => {
    const initialGuess = generateRandomBetween(LowNumber, HighNumber, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(LowNumber); // Used instead of state to prevent re-render
    const currentHigh = useRef(HighNumber); // Used instead of state to prevent re-render
    const { userChoice, onGameOver} = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
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

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)

        setCurrentGuess(nextNumber);
        // setRounds(rounds => rounds + 1)
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <View>
                    <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                        <Ionicons name={"md-arrow-down-sharp"} size={24} color="white"/>
                    </MainButton>
                </View>
                <View>
                    <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
                    <Ionicons name={"md-arrow-up-sharp"} size={24} color="white"/>
                    </MainButton>
                </View>
            </Card>
            <View style={styles.list}>
                <ScrollView>
                    {pastGuesses.map((guess, index) => renderListItem(guess, (pastGuesses.length - index)))}
                </ScrollView>
            </View>
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
    },
    list: {
        width: "80%",
        flex: 1, // Needed on android
    },
    listItem: {
        flexDirection: "row",
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        justifyContent: "space-between"
    },
});

export default GameScreen;