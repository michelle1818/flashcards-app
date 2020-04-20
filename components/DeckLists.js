import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllDecks } from '../actions';
import DeckListItem from './DeckListItem';

class DeckList extends Component {

  componentDidMount() {
    this.props.getAllDecks();
  }

  _keyExtractor = (item, index) => (index.toString());

  navigateToDeck = (deck) => {
    this.props.navigation.navigate('Deck', { deck });
  }

  render() {
    return (
      <FlatList 
        style={styles.deckList}
        data={Object.values(this.props.decks)}
        keyExtractor={this._keyExtractor}
        renderItem={({ item,index }) => (
          <DeckListItem 
            deck={item} 
            navigateToDeck={this.navigateToDeck} 
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