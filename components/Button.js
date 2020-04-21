import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { white } from '../utils/colors';

const Button = ({ children, onPress, style }) => (

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
    paddingBottom:13,
    margin: 5,
    backgroundColor: 'blue',
    width: 180,
    borderRadius: 5,
    color: white,
    textAlign: 'center',
    fontSize:16,
    borderColor: 'blue',
    borderStyle: 'solid',
    borderWidth: 2
  }
});

export default Button;
