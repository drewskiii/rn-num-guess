import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';


export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => { // need to pass this in the StartGameScreen, use prop
    setUserNumber(selectedNumber);
    setGuessRounds(0); // reset guessRounds on new game
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler}/>;  
  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  }
  else if (guessRounds != 0) {
    content = <GameOverScreen onNewGame={configureNewGameHandler} rounds={guessRounds} userNumber={userNumber}/>
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a number"/>
      {/*<StartGameScreen/>
       <GameScreen/>  
       can't simply render screen right away, need useState and vars*/}
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
