import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { saveDeckTitle } from '../utils/api';
import { red, black } from '../utils/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNewDeck } from '../actions';
import Button from './Button';

class CreateDeck extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      inputTooShort: false,
      tooShortNote: "The name of this deck is too short!"
    };
  }

  createDeck = () => {
    const { title, inputTooShort } = this.state;
    if (!inputTooShort && title.trim().length > 1) {
      
      saveDeckTitle(title);

      const deckObj = {
        [title]: {
          title: title,
          questions: []
        }
      };
      this.props.addNewDeck(deckObj);

      this.props.navigation.navigate('Deck', { deck: this.state.title });

      this.setState({ title: '' });
    } else {

      this.handleChangeText(this.state.title)
    }
  }

  handleChangeText = (value) => {
    let isShort = false;
    let textToShow = this.state.tooShortNote;
    if (!(value.trim().length > 3)) {
      isShort = true;
      if (!(value.trim().length > 0)) {
        textToShow="A Deck Title is required!"
      }
    }
    this.setState(() => ({ inputTooShort: isShort, tooShortNote: textToShow, title:value }))
  }

  render() {
    const { tooShortNote, title, inputTooShort } = this.state;
    return (
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={styles.container}>
          <TextInput
            style={styles.title}
            onChangeText={value => this.handleChangeText(value)}
            value={title}
            placeholder="What is the deck title?"
            placeholderTextColor={black}
          />
          {inputTooShort && <Text style={styles.err}>{tooShortNote}</Text>}
          <View style={{ marginTop: 10, alignSelf: 'center' }}>
            <Button onPress={this.createDeck}><Text style={{ fontWeight: 'bold' }}>Create Deck</Text></Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',

  },
  err: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: red,
    marginBottom:20
  },
  title: {
    padding: 10,
    marginTop: 35,
    marginBottom: 0,
    textAlign: "center",
    fontSize: 17
    
  },
  button: {
    alignItems: "center"
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNewDeck }, dispatch);
}

export default connect(null, mapDispatchToProps)(CreateDeck);