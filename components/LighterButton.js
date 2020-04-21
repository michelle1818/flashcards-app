import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { black } from '../utils/colors';

const LighterButton = ({ children, onPress, style }) => (

    <TouchableOpacity onPress={onPress} >
        <Text style={[styles.button, style]}>
            {children}
        </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        padding: 10,
        paddingTop: 13,
        paddingBottom: 13,
        margin: 5,
        backgroundColor: 'white',
        width: 180,
        borderRadius: 5,
        color: black,
        textAlign: 'center',
        fontSize: 16,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2
    }
});

export default LighterButton;