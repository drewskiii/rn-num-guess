import React , { useState, useRef, useEffect} from 'react';
// useEffect used to run logic after every rerender cycle.

import {View, Text, StyleSheet, Button, 
    Alert, ScrollView, FlatList, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

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

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
    );

const GameScreen = props => {
    // initialGuess will not be in currentGuess after initial on rerender.
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]); // counter for num of guesses
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
            onGameOver(pastGuesses.length);
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
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        // set toString() for FlatList keyExtractor sake
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };

    let listContainerStyle = styles.listContainer;
    if (Dimensions.get('window').width < 350 ) {
        listContainerStyle = styles.listContainerBig;
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>
                Oppenent's guess
            </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                {/* <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')}/> */}
                {/* <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')}/> */}
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name={'md-remove'} size={24} color={'white'}/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                <Ionicons name={'md-add'} size={24} color={'white'}/>
                </MainButton>
            </Card>
            <View style={listContainerStyle}>    
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses
                    .map((guess, idx) => renderListItem(guess, pastGuesses.length - idx))
                    }
                </ScrollView> */}
                <FlatList 
                    keyExtractor={item => item} // making data {'key' : value, ...}
                    data={pastGuesses} 
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                    />
            </View>
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
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    listContainer: {
        // width: Dimensions.get('window') > 500 ? '60%' : '80%',
        width: '60%',
        flex: 1,
    },
    listContainerBig: {
        flex: 1, 
        width: '80%',
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end',
    },


});

export default GameScreen;