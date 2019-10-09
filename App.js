import React from 'react';
import { StatusBar} from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';

//Screen
import HomeScreen from './Screen/index'
import LoginScreen from './Screen/Login'

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

const RootStack = createSwitchNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Home: {
      screen: HomeScreen
    }
  },
  {
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}