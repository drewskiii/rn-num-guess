import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';  // prolong loading until fetches are done

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
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
      onError={(err) => console.log(err)}
      />
    );
    /* startAsync: point at the function we want to start
     once AppLoading is first rendered, has to be a function 
     that returns a promise. Then when promised (call is done), 
     will call onFinish
     */  
  }

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
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a number"/>
      {/*<StartGameScreen/>
       <GameScreen/>  
       can't simply render screen right away, need useState and vars*/}
      {content}
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
