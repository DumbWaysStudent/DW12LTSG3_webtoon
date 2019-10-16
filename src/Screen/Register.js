import React from 'react';
import { StyleSheet,ToastAndroid, Image} from 'react-native';
import { Container, Button, Text, Item, Input, Label, Icon, Header, Left, View, Body, Right} from 'native-base';
import Axios from 'axios'

export default class LoginScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        name: '',
        email : '',
        pass: '',
        secure: true,
      }
    }
    
    render() {
      return (
        <Container>
          <Header style={style.header}  androidStatusBarColor="black">
            <Left>
              <Button
              transparent
              onPress={()=> this.props.navigation.navigate('Auth')}
              >
                <Icon name='arrow-back' type='MaterialIcons' style={{color: 'black'}}/>
              </Button>
            </Left>
              <Body></Body>
            <Right></Right>
          </Header>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={style.textStyle}>
                  REGISTER
                </Text>
                  <Text style={style.textStyleDesc}>
                    Create with your account WEBTOON
                  </Text>
                    <Label style={style.fontFamily}>Name</Label>
                      <Item style={style.Width}>
                        <Input
                          style={style.Input}
                          onChangeText={(name)=> {this.setState({name})}}
                        />
                      </Item>
                    <Label style={style.fontFamily}>Email</Label>
                      <Item style={style.Width}>
                        <Input
                          style={style.Input}
                          onChangeText={(email)=> {this.setState({email})}}
                        />
                      </Item>
                    <Label style={style.fontFamily}>Password</Label>
                    <Item last style={style.WidthPass}>
                        <Input
                          style={style.Input}
                          onChangeText={(pass)=> {this.setState({pass})}}
                          secureTextEntry={this.state.secure}
                        />
                          <Button 
                            transparent 
                            style={style.iconbtn} 
                            onPress={()=> {this.falseSecure()}}
                          >
                            <Icon 
                              style={style.Icon}
                              name={this.state.secure == true ? 'md-eye-off' : 'md-eye'} 
                            />
                          </Button>
                    </Item>
                  <Button
                    onPress={()=>this.register()}
                    style={style.ButtonForm} 
                  >   
                    <Icon 
                    name = 'adduser' 
                    type = 'AntDesign'
                      style= {style.iconb}
                    />
                    <Text style={{fontSize: 20, color: 'white'}}>
                      Sign Up
                    </Text>
                  </Button>
            </View>
        </Container>
      );
    }
    register(){
      Axios({
        method: 'post',
        url: 'http://192.168.0.49:4000/api/v1/register',
        data: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.pass
        }
      })
      .then((result)=>{
        alert(result.data['msg'])
      })
    }
}
  
  const style = StyleSheet.create({
    header: {
      backgroundColor: 'white',
      color: 'black'
    },
    iconb:{
      color: 'white',
    },
    Icon: {
      color: '#2ecc71'
    },
    textStyle:{
      fontSize: 60,
      fontWeight: 'bold',
      fontFamily: 'roboto'
    },
    textStyleDesc:{
      fontSize: 24,
      paddingTop: 20,
      paddingBottom:10
    },
    fontFamily: {
      fontFamily: 'roboto',
      fontSize: 24,
      color: 'black',
      fontWeight: 'bold',
      paddingLeft: 30,
      paddingRight: 30,
      alignSelf: 'flex-start'
    },
    Width:{
      height: 80,
      borderBottomWidth: 0,
      paddingLeft: 30,
      paddingRight: 30,
    },
    WidthPass:{
      height: 80,
      borderBottomWidth: 0,
      paddingLeft: 30,
      paddingRight: 30,
    },
    Input:{
      paddingLeft: 20,
      height:60,
      backgroundColor: '#2ecc71',
      color: 'white',
      borderRadius: 30
    },
    ButtonForm:{
      marginTop: 20,
      alignSelf: 'stretch',
      marginLeft: 30,
      marginRight: 30,
      justifyContent: 'center',
      backgroundColor: '#2ecc71',
      color: 'white',
      height: 60,
      borderRadius: 10
    },
    iconbtn:{
      height: 60,
    }
  })
  