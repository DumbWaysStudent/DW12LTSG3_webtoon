import React from 'react';
import { StyleSheet,ToastAndroid, Image} from 'react-native';
import { Container, Button, Text, Item, Input, Label, Icon} from 'native-base';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'

export default class LoginScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        email : '',
        pass: '',
        secure: true,
      }
    }
    render() {
      return (
        <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image 
            source={require('../asset/image/logo.png')}
            style={{height: 200, width: 200}}
          />
            <Text style={style.textStyle}>
              LOG IN
            </Text>
              <Text style={style.textStyleDesc}>
                Login with your account WEBTOON
              </Text>
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
                style={style.ButtonForm} 
                onPress={()=> {this.LoginBtn()}} 
                disabled={this.disableBtn()} 
              >   
                <Icon 
                  name = 'sign-in' 
                  type = 'FontAwesome'
                  style= {style.iconb}
                />
                <Text style={{fontSize: 20, color: 'white'}}>
                  
                  Sign In
                </Text>
              </Button>
            <Button style={style.ButtonForm}>
              <Icon 
                name = 'adduser' 
                type = 'AntDesign'
                style= {style.iconb}
              />
              <Text style={{fontSize: 20, color: 'white'}}>Sign Up</Text>
            </Button>
        </Container>
      );
    }
    LoginBtn(){
      const {email} = this.state
      const {pass} = this.state
      const {navigation} = this.props
      if(email){
        if(pass){
          const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if(reg.test(email) == true){
            Axios({
              method: 'post',
              url:'http://192.168.0.49:4000/api/v1/login',
              data: {
                email,
                password:pass
              }
            })
            .then(function(result){
              const token = result.data['token']
              AsyncStorage.setItem('userToken', token);
              navigation.navigate('App')
            })
          }else{
            ToastAndroid.show('Only Email Input', ToastAndroid.SHORT);
          }
        }
      }
      
    }
    falseSecure(){
      switch(this.state.secure){
        case false :
            this.setState({secure: true})
        break;
        case true :
            this.setState({secure: false})
        break;
      }
    }
    disableBtn(){
      if(this.state.email && this.state.pass){
        return false
      }else{
        return true
      }
    }
  }
  
  const style = StyleSheet.create({
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
  