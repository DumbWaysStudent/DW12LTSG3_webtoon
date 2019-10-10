import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {Container, Text, Header, Left, Body, Right, Button, Icon, Title, Input, Item} from 'native-base'
import ImagePicker from 'react-native-image-picker';


export default class EditProfileScreen extends React.Component{
    state = {
        imageSource : '',
        name: ''
    }
    constructor(props) {
        super(props);
        this.selectPhoto = this.selectPhoto.bind(this); 
    }
    selectPhoto(){
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
              skipBackup: true,
            },
        };
        ImagePicker.showImagePicker(options, res=>{
            let source = {uri : res.uri}
            if (!res.didCancel) {
                if(!res.error){
                    this.setState({
                        imageSource : source
                    })
                }
            }
        })
    }
    render(){
        return(
            <Container>
                <Header style={style.header} androidStatusBarColor="black">
                    <Body>
                        <Title style={{color : 'black'}}>Edit Profile</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=> this.props.navigation.navigate('Profile',{
                            url: this.state.imageSource,
                            name: this.state.name
                        })}>
                            <Icon style={{color: 'orange'}} name='check' type='FontAwesome'/>
                        </Button>
                    </Right>
                </Header>
                <View style={style.userProfile}>
                    {this.state.imageSource ?
                    <Image
                    source={this.state.imageSource}
                    style={{width: 200, height: 200, borderRadius: 100}}/>
                    :
                    <Image
                    source={{uri: this.props.navigation.getParam('url')}}
                    style={{width: 200, height: 200, resizeMode: 'stretch'}}/>
                    }
                    <Button
                    warning 
                    style={style.btncamera}
                    rounded
                    onPress={this.selectPhoto.bind(this)}
                    >
                        <Icon name='camera'  style={style.camera}/>
                    </Button>
                    <Item>
                        <Input
                        style={style.inputProfile}
                        defaultValue={this.props.navigation.getParam('name')}
                        onChangeText={(text) => this.setState({name: text})}
                        />
                    </Item>
                    
                </View>
            </Container>
        )
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
        paddingTop: 20,
        paddingBottom: 40
    },
    textUser: {
        fontSize: 40,
    },
    camera: {
        color: 'white', 
        fontSize: 18
    },
    btncamera: {
        position: 'relative',
        marginTop: 10
    },
    inputProfile:{
        textAlign: 'center',
        fontSize: 24
    }
})