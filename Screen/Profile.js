import React from 'react';
import {StyleSheet, Image} from 'react-native'
import {Container, Text, Header, Left, Body, Right, Button, Icon, View} from 'native-base';

const name = 'User Profile';
const image = 'http://getdrawings.com/free-icon-bw/avatar-icon-23.png'
export default class ProfileScreen extends React.Component {
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
                    url: image,
                    name: name
                  })}>
                    <Icon name='edit' type='MaterialIcons' style={{color: 'black'}}/>
                  </Button>
              </Right>
          </Header>
          <View style={style.userProfile}>
          {
            this.props.navigation.getParam('url') ? 
            <Image
            source={this.props.navigation.getParam('url')} 
            style={{width: 200, height: 200, borderRadius: 100}}
            />:
            <Image
            source={{uri: image}}
            style={{width: 200, height: 200, borderRadius: 100}}
            />
          }
          {
            this.props.navigation.getParam('name') ?
            <Text style={style.textUser}>{this.props.navigation.getParam('name')}</Text> :
            <Text style={style.textUser}>User Profile</Text>
          }
          </View>
          <Button warning iconRight full style={style.button}>
              <Left style={{paddingLeft: 10}}>
                <Text style={{color: 'white'}}>My Webtoon Creaton</Text>
              </Left>
              <Right  style={{paddingRight: 10}}>
                <Icon style={{color: 'white'}} name='ios-arrow-forward' />
              </Right>
          </Button>
          <Button warning full style={style.button}>
              <Left  style={{paddingLeft: 10}}>
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