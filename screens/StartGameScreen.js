import React, {useState, useEffect} from 'react';

import { View, StyleSheet, Text, TextInput, Button, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView

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
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4); // use state to dynamically change style

    
    useEffect(() => { // useEffect any rerender
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
        Dimensions.addEventListener('change', updateLayout) // listens to dimension changes, if changes, call f()
        return () => { // runs before useEffect runs; "cleanup" function
            // remove old event listener, then add a new one
            Dimensions.removeEventListener("change", updateLayout);
        };
    });

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
        // replace any non digit number with an empty string
        // to only get digit values
    };
    
    const resetInputHandler = () => {
        setEnteredValue("");
        setConfirmed(false);
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
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
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
                                <View style={{width: buttonWidth}}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/></View>
                                <View style={{width: buttonWidth}}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/></View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View> 
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
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
        width: "80%",
        maxWidth: '95%',
        minWidth: 300,
        // maxWidth: 300,
        alignItems:'center',
        
    },
    // button: { using inline style above
    //     // width: 100,
    //     width: Dimensions.get('window').width / 4,

    // },
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