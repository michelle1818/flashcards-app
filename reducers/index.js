import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions';

export default function decks(state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.payload
      }
    case ADD_CARD:
      const updatedDeck = state[action.deck];
      updatedDeck.questions.push(action.card);
      return {
        ...state,
        [action.deck]: updatedDeck
      };
    default:
      return state;
  }
}
