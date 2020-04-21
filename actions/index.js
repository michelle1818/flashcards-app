import { getDecks } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export function getAllDecks() {
  return (dispatch) => {
    getDecks()
      .then((decks) => {
        dispatch({
          type: RECEIVE_DECKS, 
          decks
        })
      })
  }
}

export function addNewDeck(deck) {
  return {
    type: ADD_DECK,
    payload: deck
  }
}

export function addNewCard(deck, card) {
  return {
    type: ADD_CARD,
    deck,
    card
  }
}

