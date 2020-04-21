import React, { PureComponent } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { addCardToDeck } from '../utils/api';
import { red, black } from '../utils/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNewCard } from '../actions';
import Button from './Button';

class AddCard extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      qTooShort: false,
      qTooShortNote: 'The question is too short!',
      aTooShort: false,
      aTooShortNote: 'The answer is too short!',
    };
  }

  createCard = () => {
    const { question, answer, qTooShort, aTooShort } = this.state;

    if(!qTooShort && !aTooShort && question.trim().length>1 && answer.trim().length>1) {
      const cardObj = {
        question: this.state.question,
        answer: this.state.answer
      }
      const deckTitle = this.props.route.params.deckTitle;

      addCardToDeck(deckTitle, cardObj);

      this.props.addNewCard(deckTitle, cardObj);

      this.setState({ 
        question: '',
        answer: ''
      });

      this.props.navigation.navigate('Deck', { deck: deckTitle });

    } else {

      this.handleChangeText(answer, 'answer');
      this.handleChangeText(question, 'question');
    }
  }

  handleChangeText = (value, sourceInput) => {
    let short = false;
    let tooShortField = '';
    let tooShortNote = '';
    let textView = '';
    if (sourceInput && sourceInput === "question") {
      textView = this.state.qTooShortNote;
      if (!(value.trim().length > 6)) {
        short = true;
        if (!(value.trim().length > 0)) {
          textView = "The Question field is required"
        }
      }
      tooShortField = "qTooShort";
      tooShortNote = "qTooShortNote";
    } else if (sourceInput && sourceInput === "answer") {
      
      textView = this.state.aTooShortNote;
      if (!(value.trim().length > 1)) {
        short = true;
        if (!(value.trim().length > 0)) {
          textView = "The Answer field is required"
        }
      }
      tooShortField = "aTooShort";
      tooShortNote = "aTooShortNote";
    }
    if (sourceInput) {
      this.setState(() => ({ [tooShortField]: short, [tooShortNote]: textView,[sourceInput]:value}))
    }
  }

  render() {
    const { question, answer, qTooShortNote, qTooShort, aTooShort, aTooShortNote } = this.state;
    return (
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={question => this.handleChangeText(question, 'question')}
            value={question}
            placeholder="Type in the Question"
            placeholderTextColor={black}
          />
          {qTooShort && <Text style={styles.error}>{qTooShortNote}</Text>}

          <TextInput
            style={styles.input}
            onChangeText={answer => this.handleChangeText(answer,'answer')}
            value={answer}
            placeholder="Type in the Answer"
            placeholderTextColor={black}
          />
          {aTooShort && <Text style={styles.error}>{aTooShortNote}</Text>}

          <View style={{ marginTop: 10, alignSelf: 'center' }}>
            <Button onPress={this.createCard}><Text style={{ fontWeight: 'bold' }}>Create Card</Text></Button>
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
    marginBottom: 20
  },
  input: {
    padding: 10,
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17
  },
  buttonWrapper: {
    alignItems: "center"
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNewCard }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddCard);