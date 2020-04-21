import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllDecks } from '../actions';
import DeckDetails from './DeckDetails';

class DeckList extends Component {

  componentDidMount() {
    this.props.getAllDecks();
  }

  key = (item, index) => (index.toString());

  goToDeck = (deck) => {
    this.props.navigation.navigate('Deck', { deck });
  }

  render() {
    return (
      <FlatList 
        style={styles.deckList}
        data={Object.values(this.props.decks)}
        keyExtractor={this.key}
        renderItem={({ item,index }) => (
          <DeckDetails 
            deck={item} 
            goToDeck={this.goToDeck} 
            itemIndex={index}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  deckList: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 5,
    padding: 10
  }
});

function mapStateToProps(state) {
  return { decks: state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllDecks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList); 