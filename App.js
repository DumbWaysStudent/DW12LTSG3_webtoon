import React from 'react';
import {Icon, Button} from 'native-base'
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

//Screen
import LoginScreen from './src/Screen/Login'

//Screen Home Private
import HomeScreen from './src/Screen/Home'
import FavoriteScreen from './src/Screen/Favorite'
import ProfileScreen from './src/Screen/Profile'

//Screen Home Private Screen
import DetailScreen from './src/Screen/Detail'
import EpisodeScreen from './src/Screen/Episode'
import EditProfileScreen from './src/Screen/EditProfile'
import MyWebtoonScreen from './src/Screen/MyWebtoon'
import CreateWebtoonScreen from './src/Screen/CreateWebtoon'
import CreateEpisodeScreen from './src/Screen/CreateEpisode'
import EditMyWebtoonScreen from './src/Screen/EditWebtoon'
import EditEpisodeScreen from './src/Screen/EditEpisode'

//Auth Loading
import AuthLoadingScreen from './src/Screen/Auth'


const HomeTabNavigator = createBottomTabNavigator({
  Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarOptions: {
            activeTintColor: '#2ecc71',
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
        activeTintColor: '#2ecc71',
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
        activeTintColor: '#2ecc71',
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
  CreateWebtoon:{
    screen: CreateWebtoonScreen,
    navigationOptions:{
      header: null
    }
  },
  CreateEpisode:{
    screen: CreateEpisodeScreen,
    navigationOptions:{
      header: null
    }
  },
  EditProfile:{
    screen: EditProfileScreen,
    navigationOptions: {
      header: null
    }
  },
  MyWebtoon: {
    screen: MyWebtoonScreen,
    navigationOptions:{
      header: null
    }
  },
  EditMyWebtoon:{
    screen: EditMyWebtoonScreen,
    navigationOptions:{
      header:null
    }
  },
  EditEpisode:{
    screen: EditEpisodeScreen,
    navigationOptions: {
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
  AuthLoading: AuthLoadingScreen,
  Auth: LoginScreen,
  App: PrivateScreen,
},
{
  initialRouteName: 'AuthLoading'
})



const AppContainer = createAppContainer(PublicScreen);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}