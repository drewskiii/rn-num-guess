import React from 'react';

import {View, Text, StyleSheet, Button, Image, Dimensions, ScrollView} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <ScrollView>
        <View style={styles.screen}>
            <TitleText>The game is over</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                    fadeDuration={1000}
                    source={require('../assets/success.png')} 
                    // source={{uri: 
                    //     "https://images.unsplash.com/photo-1613976132984-1854eff7a5a0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80"}}
                    style={styles.image}
                    resizeMode="cover"/>
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed 
                    <Text style={styles.highlight}> {props.rounds} </Text> 
                    rounds to guess the number 
                    <Text style={styles.highlight}> {props.userNumber}</Text>
                </BodyText>
            </View>
            {/* <BodyText>The number was {props.userNumber}</BodyText> */}
            {/* <Button title="Play Again" onPress={props.onNewGame}/> */}
            <MainButton onPress={props.onNewGame}>Play Again</MainButton>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 50,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: "center",
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    },
});

export default GameOverScreen;