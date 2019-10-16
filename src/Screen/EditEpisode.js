import React from 'react';
import {StyleSheet, Image} from 'react-native'
import {Container, Text, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Label,CardItem, View} from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

export default class CreateEpisode extends React.Component{
    constructor(){
        super()
        this.state = {
            data : '',
            text: '',

        }
    }
    componentDidMount(){
        this.setState({
            data: this.props.navigation.getParam('image')
        })
    }
    render(){
        return(
            <Container>
                <Header style={style.header}  androidStatusBarColor="black">
                    <Left>
                        <Button 
                        transparent
                        onPress={()=> this.props.navigation.goBack()}>
                            <Icon 
                            name='ios-arrow-back'
                            style={{color: 'black'}}
                            />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color: 'black'}}>Edit Episode</Title>
                    </Body>
                    <Right>
                        <Button transparent
                        onPress={()=> this.EditEpisode()}>
                            <Icon style={{color: 'orange'}} name='check' type='FontAwesome'/>
                        </Button>
                    </Right>
                </Header>
                <Item stackedLabel style={style.ItemInput}>
                    <Label style={style.Label}>Name</Label>
                    <Input 
                    value={this.props.navigation.getParam('title')}
                    onChangeText={(text)=> this.setState({text: text})}
                    style={style.Input}
                    />
                </Item>
                <View>
                    <Text style={style.Episode}>Image</Text>
                        <FlatList
                            style={{height: 400}}
                            keyExtractor={(item,index)=> index.toString()}
                            scrollEnabled={true}
                            data={this.state.data}
                            renderItem={({item, index})=>(
                                <CardItem key={index}>
                                    <Image source={{uri: item.url}} style={style.ImageFlatListDetail}/>
                                    <Text style= {{fontFamily: 'Roboto',alignSelf: 'flex-start', fontWeight: 'bold',fontSize: 22, paddingLeft: 10}}>{item.title}</Text>
                                            <Button full danger 
                                            onPress={()=> this.delImage(index)}
                                            style= {{fontFamily: 'Roboto', position: 'absolute', fontSize: 14, marginLeft: 130,alignItems:'flex-start',paddingTop: 15, marginTop: 65}}>
                                                <Text>Delete</Text>
                                            </Button>
                                </CardItem>
                            )}
                        />
                    <Button
                    style={style.button}
                    onPress={()=> this.addimage()}
                    full 
                    warning>
                        <Icon name='plus' type='Entypo'/>
                        <Text style={{paddingLeft: 0}}>Image</Text>
                    </Button>
                    <Button
                    style={style.button}
                    style={style.button}
                    full 
                    danger>
                        <Text style={{paddingLeft: 25}}>Delete Episode</Text>
                    </Button>
                </View>
                
            </Container>
        )
    }
    addimage(){
        const option = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
              skipBackup: true,
            },
        }
        ImagePicker.showImagePicker(option, res=>{
            let ImageSource = res.uri
            let Title = res.fileName;
            if(!res.didCancel){
                if(!res.error){
                    this.state.data.push({
                            title: Title,
                            url: ImageSource
                    })
                    this.setState({data: this.state.data})
                }
            }
        })
    }
    delImage(index){
        this.state.data.splice(index, 1);
        this.setState({data : this.state.data})
    }
    EditEpisode(){
        if(this.props.navigation.getParam('navigation') == true){
            this.props.navigation.navigate('EditMyWebtoon',{
                    image: this.state.data
            })
        }else{
            this.props.navigation.navigate('CreateWebtoon',{
                image: this.state.data
            })
        }
    }
}
const style = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        color: 'black'
    },
    Label:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    ItemInput:{
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        borderBottomWidth: 2,
    },
    Input:{
        fontSize: 16,
        height:50,
        paddingTop:10,
    },
    Episode:{
        marginLeft: 20,
        marginTop: 30,
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    ImageFlatListDetail:{
        width: 100,
        height: 100,
        borderWidth: 3,
        borderColor: 'black',
        marginBottom: 10
    },
    button: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    }
})