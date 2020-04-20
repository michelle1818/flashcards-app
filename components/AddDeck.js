import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { saveDeckTitle } from '../utils/api';
import { red, black } from '../utils/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNewDeck } from '../actions';
import Button from './Button';

class AddDeck extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      textTooShort: false,
      textTooShortNote: "The name of this deck is too short!"
    };
  }

  createDeck = () => {
    const { title, textTooShort } = this.state;
    if (!textTooShort && title.trim().length > 1) {
      
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
    let textToShow = this.state.textTooShortNote;
    if (!(value.trim().length > 3)) {
      isShort = true;
      if (!(value.trim().length > 0)) {
        textToShow="A Deck Title is required!"
      }
    }
    this.setState(() => ({ textTooShort: isShort, textTooShortNote: textToShow, title:value }))
  }

  render() {
    const { textTooShortNote, title, textTooShort } = this.state;
    return (
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={styles.container}>
          <TextInput
            underlineColorAndroid='#2962ff'
            style={styles.titleInput}
            onChangeText={value => this.handleChangeText(value)}
            value={title}
            placeholder="Deck Title"
            placeholderTextColor={black}
          />
          {textTooShort && <Text style={styles.error}>{textTooShortNote}</Text>}
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
  error: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: red,
    marginBottom:20
  },
  titleInput: {
    padding: 10,
    marginTop: 35,
    marginBottom: 0,
    fontSize: 17
  },
  buttonWrapper: {
    alignItems: "center"
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNewDeck }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddDeck);