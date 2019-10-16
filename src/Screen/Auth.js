import React from 'react'
import {
    ActivityIndicator,
    StatusBar,
    View,
  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export default class AuthLoadingScreen extends React.Component{
    componentDidMount(){
        this.Storage()
    }
    Storage = async () =>{
        const userToken = await AsyncStorage.getItem('userData');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }
    render(){
        return(
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}
