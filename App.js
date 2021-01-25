import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

import Header from "./components/Header";
import StartGameScreen from "./screen/StartGameScreen";
import GameScreen from "./screen/GameScreen";
import GameOverScreen from "./screen/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler= numberOfRounds => {
    setGuessRounds(numberOfRounds);
  };

  const content = userNumber && guessRounds <= 0
    ? <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
    : guessRounds > 0 
      ? <GameOverScreen />
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
