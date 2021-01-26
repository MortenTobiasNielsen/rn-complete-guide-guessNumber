import React, {useState, useRef, useEffect} from "react";
import {
    View, 
    Text, 
    StyleSheet, 
    Alert, 
    ScrollView, 
    FlatList,
    Dimensions,
} from "react-native";
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

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
)

const GameScreen = props => {
    const initialGuess = generateRandomBetween(LowNumber, HighNumber, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(LowNumber); // Used instead of state to prevent re-render
    const currentHigh = useRef(HighNumber); // Used instead of state to prevent re-render
    const { userChoice, onGameOver} = props;

    // const [deviceWidth, setDeviceWidth] = useState(Dimensions.get("window").width);
    const [deviceHeight, setDeviceHeight] = useState(Dimensions.get("window").height);

    useEffect(() => {
        const updateLayout= () => {
            setDeviceHeight(Dimensions.get("window").height);
            // setDeviceWidth(Dimensions.get("window").width);
        }

        Dimensions.addEventListener("change", updateLayout);

        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        };
    }, []);

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
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    }

    if (deviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <View>
                        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                            <Ionicons name={"md-arrow-down-sharp"} size={24} color="white"/>
                        </MainButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View>
                        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
                        <Ionicons name={"md-arrow-up-sharp"} size={24} color="white"/>
                        </MainButton>
                    </View>
                </View>
                <View style={styles.listContainer}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, (pastGuesses.length - index)))}
                    </ScrollView> */}
                    <FlatList 
                        keyExtractor={(item) => item} 
                        contentContainerStyle={styles.list}
                        data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)}/>
                </View>
            </View>
        );
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
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, (pastGuesses.length - index)))}
                </ScrollView> */}
                <FlatList 
                    keyExtractor={(item) => item} 
                    contentContainerStyle={styles.list}
                    data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)}/>
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
        marginTop: Dimensions.get("window").height / 720 * 10, // To hopefully get the same look on all devices
        width: 400,
        maxWidth: "90%"
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "60%",
    },
    listContainer: {
        width: "60%",
        flex: 1, // Needed on android
    },
    list: {
        // alignItems: "center",
        justifyContent: "flex-end",
        flexGrow: 1,
    },
    listItem: {
        flexDirection: "row",
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        justifyContent: "space-between",
        width: "100%",
    },
});

export default GameScreen;