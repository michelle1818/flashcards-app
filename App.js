import 'react-native-gesture-handler';
import React from 'react';
import AddCard from './components/AddCard';
import DeckLists from './components/DeckLists';
import CreateDeck from './components/CreateDeck';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import { View, Platform, StatusBar } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import Reducer from './reducers';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { setNotif } from './utils/notifications';
import { white, blueDark } from './utils/colors';




let Application;
if (Platform.OS === 'ios') {
  Application = createBottomTabNavigator();
} else {
  Application = createMaterialTopTabNavigator();
}


const AppStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor: backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}


const tabBarIcon = (tab, focused, color) => {
  let iconName;

  if (tab === "Decks") {
    iconName = 'elementor';
    return <FontAwesome5 name={iconName} size={27} color={color} />;
  } else if (tab === "Add Deck") {
    iconName = 'plus-square';
    return <FontAwesome name={iconName} size={27} color={color} />;
  }

}

const MainScreenTab = () => {
  return (
    <Application.Navigator
      screenOptions={({ route }) => ({

      })}
    >
      <Application.Screen
        name="All Decks"
        component={DeckLists}
        options={{ tabBarIcon: ({ focused, color, size }) => (tabBarIcon('Decks', focused, color, size)) }}

      />
      <Application.Screen
        name="Create Deck"
        component={CreateDeck}
        options={{ tabBarIcon: ({ focused, color, size }) => (tabBarIcon('Add Deck', focused, color, size)) }}
      />
    </Application.Navigator>
  );
}


const MainNavigator = createStackNavigator();
const MainNavigatorStackScreen = () => {
  return (
    <MainNavigator.Navigator>
      <MainNavigator.Screen name="Home" component={MainScreenTab} options={{ title: 'Decks', headerStyle: {},headerShown:false }} />
      <MainNavigator.Screen name="AddCard" component={AddCard} options={{ title: 'Add Card',  headerBackTitleVisible:true, headerStyle: { backgroundColor: white }, headerTintColor: blueDark, headerTitleAlign: 'center' }} />
      <MainNavigator.Screen name="Deck" component={Deck} options={{ title: 'Deck Detail', headerBackTitleVisible: true,  headerStyle: { backgroundColor: white }, headerTintColor: blueDark, headerTitleAlign: 'center' }} />
      <MainNavigator.Screen name="Quiz" component={Quiz} options={{ title: 'Quiz', headerBackTitleVisible: true,  headerStyle: { backgroundColor: white }, headerTintColor: blueDark, headerTitleAlign: 'center' }} />
    </MainNavigator.Navigator>
  );
}


const store = createStore(
  Reducer, applyMiddleware(thunk)
)

export default class App extends React.Component {


  componentDidMount() {
    setNotif()
  }
  render() {
    return (

      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={blueDark} barStyle='light-content' />
          <NavigationContainer>
            <MainNavigatorStackScreen />
          </NavigationContainer>
        </View>
      </Provider>

    );
  }
}

