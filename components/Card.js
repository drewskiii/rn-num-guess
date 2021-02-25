import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
    return (
        <View style={{...styles.card, ...props.style}}>{props.children}</View> 
        // style like this allows any props passed in to merge/override styles 
        // from this card template for customization
    );
};

const styles = StyleSheet.create({
    card: {
        // width: 300,
        // maxWidth: '80%',
        // alignItems:'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 5, // android
        padding: 20,
        borderRadius: 10
    }
});

export default Card;