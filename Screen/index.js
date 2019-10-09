import React from 'react'
import { Text, View } from 'react-native';
import {Icon} from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';


//Screen
import HomeScreen from './Home';

class FavoriteScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}
class ProfileScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Settings!</Text>
        </View>
      );
    }
  }

const TabNavigator = createBottomTabNavigator({
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

export default createAppContainer(TabNavigator);