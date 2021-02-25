import React from 'react';

import {View, Text, StyleSheet, Button} from 'react-native';


const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The game is over</Text>
            <Text>Number of rounds {props.rounds}</Text>
            <Text>The number was {props.userNumber}</Text>
            <Button title="Play Again" onPress={props.onNewGame}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default GameOverScreen;