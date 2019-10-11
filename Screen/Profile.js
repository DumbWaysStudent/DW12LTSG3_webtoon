import React from 'react';
import {StyleSheet, Image} from 'react-native'
import {Container, Text, Header, Left, Body, Right, Button, Icon, View} from 'native-base';

export default class ProfileScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        url : {uri : 'http://getdrawings.com/free-icon-bw/avatar-icon-23.png'},
        name : 'User Profile'
      }
    }
    render() {
      return (
        <Container>
          <Header style={style.header} androidStatusBarColor="black">
              <Left>
                  <Text style={{fontSize: 18,fontWeight: 'bold'}}>Profile</Text>
              </Left>
              <Body>
              </Body>
              <Right>
                  <Button transparent onPress={()=> this.props.navigation.navigate('EditProfile',{
                    url: this.state.url,
                    name: this.state.name
                  })}>
                    <Icon name='edit' type='MaterialIcons' style={{color: 'black'}}/>
                  </Button>
              </Right>
          </Header>
          <View style={style.userProfile}>
            <Image
            source={this.props.navigation.getParam('url') ? this.props.navigation.getParam('url'): this.state.url} 
            style={{width: 200, height: 200, borderRadius: 100}}
            />
            <Text style={style.textUser}>{this.props.navigation.getParam('name') ? this.props.navigation.getParam('name'): this.state.name}</Text>
          </View>
          <Button
          warning
          iconRight
          full
          onPress={()=>this.props.navigation.navigate('MyWebtoon')}
          style={style.button}>
              <Left style={{paddingLeft: 10}}>
                <Text style={{color: 'white'}}>My Webtoon Creaton</Text>
              </Left>
              <Right  style={{paddingRight: 10}}>
                <Icon style={{color: 'white'}} name='ios-arrow-forward' />
              </Right>
          </Button>
          <Button
          onPress={()=> this.props.navigation.navigate('Auth')}
          warning
          full
          style={style.button}>
              <Left style={{paddingLeft: 10}}>
                <Text style={{color: 'white'}}>Log Out</Text>
              </Left>
          </Button>
        </Container>
      );
    }
  }

const style = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        color: 'black'
    },
    userProfile: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        paddingTop: 20,
        paddingBottom: 40
    },
    textUser: {
        fontSize: 40,
    },
    button:{
        height: 50
    }
})