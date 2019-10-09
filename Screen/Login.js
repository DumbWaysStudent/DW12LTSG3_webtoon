import React from 'react';
import { StyleSheet,ToastAndroid} from 'react-native';
import { Container, Button, Text, Item, Input, Label, Icon} from 'native-base';

export default class LoginScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        email : '',
        pass: '',
        secure: true,
        eye: 'md-eye'
      }
    }
    render() {
      return (
        <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
                  <Button style={style.iconbtn} onPress={()=> {this.falseSecure()}}>
                    <Icon name={this.state.eye} />
                  </Button>
              </Item>
            <Button style={style.ButtonForm} onPress={()=> {this.LoginBtn()}} disabled={this.disableBtn()} warning>
              <Text style={{fontSize: 20, color: 'black'}}>Log In</Text>
            </Button>
        </Container>
      );
    }
    LoginBtn(){
      if(this.state.email){
        if(this.state.pass){
          const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if(reg.test(this.state.email) == true){
            this.setState({email: this.state.email})
            this.setState({pass: this.state.pass})
            this.props.navigation.navigate('Home');
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
            this.setState({eye: 'md-eye-off'})
        break;
        case true :
            this.setState({secure: false})
            this.setState({eye: 'md-eye'})
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
      height:60,
      borderWidth: 1,
    },
    ButtonForm:{
      marginTop: 20,
      alignSelf: 'stretch',
      marginLeft: 30,
      marginRight: 30,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'black',
      height: 60,
    },
    iconbtn:{
      height: 60,
      backgroundColor: 'orange'
    }
  })
  