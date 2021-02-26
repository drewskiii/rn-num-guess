import React, {useState} from 'react';

import { View, StyleSheet, Text, TextInput, Button, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert

} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
        // replace any non digit number with an empty string
        // to only get digit values
    };
    
    const resetInputHandler = () => {
        setEnteredValue("");
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) // "NotaNumber"
        {
            Alert.alert("Invalid number!", "number has to be between 1 and 99",
                 [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setEnteredValue(''); // enteredValue not updated yet since all states 
        // are handled in a batch, one render cycle
        // so enteredValue will still remain
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
        
    }
    
    // this whole component will re-run/rerender on any state changes 
    let confirmedOutput;
    
    if (confirmed) {
        confirmedOutput = 
        <Card style={styles.summaryContainer}>
            <BodyText>You selected</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            {/* <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)} /> */}
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                START GAME
            </MainButton>
        </Card>
        
    }

    // TouchableWithoutFeedback removes keyboard when tapping outside keyboard
    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); } }> 
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start a new game!</TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a number</BodyText>
                    <Input styles={styles.input} 
                        blurOnSubmit
                        autoCaptialize='none'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                        />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/></View>
                        <View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View> 
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold' // imported form app.js
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems:'center',
        
    },
    button: {
        width: 100,

    },
    input: {
        width: 100,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'

    },
    
});

export default StartGameScreen;