import React, {useState, useEffect} from "react";
import {
    View, 
    Text, 
    StyleSheet, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard, 
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";


import Card from "../components/Card";
import MainButton from "../components//MainButton";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import Colors from "../constants/colors";
import StandardFonts from "../constants/fonts";
import Input from "../components/input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [deviceHeight, setDeviceHeight] = useState(Dimensions.get("window").height)

    useEffect(() => {
        const updateLayout= () => {
            setDeviceHeight(Dimensions.get("window").height);
        }

        Dimensions.addEventListener("change", updateLayout);

        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        };
    }, []);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ""));
    };

    const resetInputHandler = () => {
        setEnteredValue("");
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Invalid Number", 
                "Number has to be a number between 1 and 99.", 
                [{
                    text: "Okay", 
                    style:"destructive", 
                    onPress: resetInputHandler}])
            return;
        };

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue("");
        Keyboard.dismiss();
    };

    const confirmedOutput = confirmed 
        ? 
            (
                <Card style={{marginTop: deviceHeight * 0.03, alignItems: "center"}}>
                    <Text>You Selected</Text>
                    <NumberContainer>{selectedNumber}</NumberContainer>
                    <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                        START GAME
                    </MainButton>
                </Card>
            )
        : null;

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                    <View style={styles.screen}>
                        <TitleText>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input 
                                style={styles.input}
                                blurOnSubmit 
                                autoCapitalize="none" 
                                autoCorrect={false}
                                keyboardType="number-pad"
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={styles.button}>
                                    <Button 
                                        title="Reset" 
                                        onPress={resetInputHandler} 
                                        color={Colors.accent}/>
                                </View>
                                <View style={styles.button}>
                                    <Button 
                                        title="Confirm" 
                                        onPress={confirmInputHandler} 
                                        color={Colors.primary}/>
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}; 

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: Dimensions.get("window").height * 0.015,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    inputContainer: {
        width: "80%",
        minWidth: 300,
        maxWidth: "95%",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    button: {
        width: "40%",
        // width: Dimensions.get("window").width / 4 // As an example of using the dimensions API
    },
    input: {
        width: "20%",
        textAlign: "center",
    }
});

export default StartGameScreen;