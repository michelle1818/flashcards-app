import { AsyncStorage } from 'react-native';

const FLASHCARDS_DATA_KEY = 'UdaciFlashcards:decks';

const startingData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'JavaScript is considered a weakly typed (or untyped) language?',
        answer: 'Correct'
      },
      {
        question: 'Closure is a combination of a function and lexical environment within which that function was declared?',
        answer: 'Yes'
      }
    ]
  }
}

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARDS_DATA_KEY).then(result => {
    if(result !== null) {
      return JSON.parse(result) 
    } else {
      AsyncStorage.setItem(FLASHCARDS_DATA_KEY, JSON.stringify(startingData));
      return startingData;
    }
  });
}

export function getDeck(title) {
  return getDecks()
    .then((decks) => decks[title]);
}

export function saveDeckTitle(title) {
  const deckObj = { title, questions: [] };
  return AsyncStorage.mergeItem(FLASHCARDS_DATA_KEY, JSON.stringify({
    [title]: deckObj
  }));
}

export function addCardToDeck(title, card) {
  return getDecks()
    .then((decks) => {
      decks[title].questions.push(card);
      AsyncStorage.mergeItem(FLASHCARDS_DATA_KEY, JSON.stringify(decks));
    });
}
