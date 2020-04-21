import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { blueHighlight, white } from '../utils/colors';
import Button from './Button';

class DeckDetails extends Component {

  render() {
    const { itemIndex, deck } = this.props;
    return (
      
      <View style={[styles.deckDetail, { marginTop: (parseInt(itemIndex) === 0) ? 20 : 0 }]}>
          <View>
          <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.number}>{deck.questions.length} Cards</Text>
          </View>
          <View style={{marginTop:20}}>
            <Button onPress={() => this.props.goToDeck(deck.title)}><Text style={{ fontWeight: 'bold' }}>View Deck</Text></Button>
          </View>
          
        </View>
    );
  }
}

const styles = StyleSheet.create({
  deckDetail: {
    backgroundColor: white,
    borderRadius: 10,
    padding: 20,
    paddingBottom:25,
    marginBottom: 30,
    marginLeft: 10,
    marginRight:10,
    alignItems:'center',
    shadowOpacity: 0.95,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    } 
  },
  title: {
    marginBottom: 8,
    fontSize: 24,
    color: 'black',
    fontWeight: "bold",
    textAlign:'center'
  },
  number: {
    color: blueHighlight,
    fontSize: 17,
    paddingTop:0,
    color: 'black',
    textAlign: 'center'
  }
});

export default DeckDetails;