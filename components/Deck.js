import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Button from './Button';
import LighterButton from './LighterButton';

class OneDeck extends Component {


  navigate = (screen) => {
    this.props.navigation.navigate(screen, {
      deckTitle: this.props.deck.title
    })
  }


  updateTitle = ({ deck, navigation }) => {
    return navigation.setOptions({ title: deck.title })
  }

  constructor(props) {
    super(props);
    this.updateTitle(this.props);
  }
  
  render() {
    const deck = this.props.deck;
    return (
      <View style={styles.deckCard}>
        <View>
          <Text style={styles.deckTitle}>{deck.title}</Text>
          <Text style={styles.cardNumber}>{deck.questions.length} Cards</Text>
        </View>
        <View>
          <View>
            <LighterButton onPress={() => this.navigate('AddCard')}><Text style={{ fontWeight: 'bold' }}>Add Card</Text></LighterButton>
          </View>
          <View style={{marginTop:10}}>
            <Button onPress={() => this.navigate('Quiz')}><Text style={{ fontWeight: 'bold' }}>Start Quiz</Text></Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckCard: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 25,
    marginTop: 60,
    marginBottom:60,
    padding: 25,
    borderRadius:10,
    backgroundColor: 'rgba(255,255,255,1)',
    elevation: 25,
    shadowRadius: 3,
    shadowOpacity: 0.95,
    shadowColor: 'rgba(0,0,0,0.8)',
    shadowOffset: {
      width: 0,
      height: 3
    } 
  },
  deckTitle: {
    fontSize: 23,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cardNumber: {
    fontSize: 15,
    textAlign: 'center'
  }
});

function mapStateToProps(state, ownProps) {
  return { deck: state[ownProps.route.params.deck] };
}

export default connect(mapStateToProps)(OneDeck);