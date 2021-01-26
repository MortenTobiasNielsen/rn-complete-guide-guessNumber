import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import Header from "./components/Header";
import StartGameScreen from "./screen/StartGameScreen";
import GameScreen from "./screen/GameScreen";
import GameOverScreen from "./screen/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return ( 
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)}
        onError={(err) => {console.log(err)}}
      />
    );
  };

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler= numberOfRounds => {
    setGuessRounds(numberOfRounds);
  };

  const content = userNumber && guessRounds <= 0
    ? <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
    : guessRounds > 0 
      ? <GameOverScreen 
          userNumber={userNumber} 
          onRestart={configureNewGameHandler}
          roundsNumber={guessRounds}/>
      : <StartGameScreen onStartGame={startGameHandler} />
  
  return (
    <View style={styles.screen}>
      <Header title={"Guess a Number"}/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
