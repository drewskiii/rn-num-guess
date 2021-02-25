import React , { useState, useRef, useEffect} from 'react';
// useEffect used to run logic after every rerender cycle.

import {View, Text, StyleSheet, Button, Alert} from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

// have function outside of component so doesn't rerender
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
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice))
    const [curRounds, setRounds] = useState(0); // counter for num of guesses
    // use useRef that survives its value after component rerendered
    // will not be reset to 1 or 100 on rerender,
    // and doesn't rerender comp on change unlike useState
    const currentLow = useRef(1); 
    const currentHigh = useRef(100);

    // using object destructuring to destructure props
    // pulling these properties out of props obj and storing them
    // in constants with equal names so we won't have to write "props."
    const { userChoice, onGameOver } = props;
    useEffect(() => {
        // if (currentGuess === props.userChoice) {
        if (currentGuess === userChoice) {
            onGameOver(curRounds);
        }
    }, // can add dependencies, first is function, 2nd param is lst of dependencies
    // useEffect will only rerun if at least one of our dependencies changed.
    [currentGuess, userChoice, onGameOver]); // have to specify which values are coming outside of useEffect()

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) 
        {
            Alert.alert("Don\'t lie!", 'you know that this is wrong...',
                [{ text: "Sorry", style: "cancel"}]);
            return;
        }
        if (direction == 'lower') {
            currentHigh.current = currentGuess; // useRef has .current prop to update
        }
        else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
    };

    return (
        <View style={styles.screen}>
            <Text>
                Oppenent's guess
            </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')}/>
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')}/>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }

});

export default GameScreen;