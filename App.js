import React from 'react';
import {Icon, Button} from 'native-base'
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

//Screen
import LoginScreen from './Screen/Login'

//Screen Home Private
import HomeScreen from './Screen/Home'
import FavoriteScreen from './Screen/Favorite'
import ProfileScreen from './Screen/Profile'


const HomeTabNavigator = createBottomTabNavigator({
  Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarOptions: {
            activeTintColor: 'orange',
            labelStyle: {
                fontSize: 14,
            },
          },
        tabBarLabel: 'For you',
        tabBarIcon:({tintColor}) => (
          <Icon name="appstore1" size={40} style={{color : tintColor}} type='AntDesign'/>
        )
      },
  },
  Favorite: {
    screen: FavoriteScreen,
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: 'orange',
        labelStyle: {
        fontSize: 14,
        },
      },
      tabBarLabel: 'Favorite',
      tabBarIcon: ({tintColor}) => (
        <Icon name="star" size={40} style={{color : tintColor}} type='AntDesign' />
      )
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
    tabBarOptions: {
        activeTintColor: 'orange',
        labelStyle: {
        fontSize: 14,
        },
      },
      tabBarLabel: 'Profile',
      tabBarIcon:({tintColor}) => (
        <Icon name="user" size={40}  style={{color : tintColor}} type='AntDesign'/>
      )
    }
  },
});

const PublicScreen = createSwitchNavigator({
  Auth: LoginScreen,
  App: HomeTabNavigator,
})



const AppContainer = createAppContainer(PublicScreen);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}