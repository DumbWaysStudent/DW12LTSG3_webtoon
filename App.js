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

//Screen Home Private Screen
import DetailScreen from './Screen/Detail'
import EpisodeScreen from './Screen/Episode'

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
const PrivateScreen = createStackNavigator({
  Episode:{
      screen: EpisodeScreen,
      navigationOptions: {
        header: null
      }
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions:{
        header: null
    }
  },
  Home: {
    screen: HomeTabNavigator,
    navigationOptions:{
      header: null
  }
  },
},
{
  initialRouteName: 'Home'
})
const PublicScreen = createSwitchNavigator({
  Auth: LoginScreen,
  App: PrivateScreen,
})



const AppContainer = createAppContainer(PublicScreen);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}