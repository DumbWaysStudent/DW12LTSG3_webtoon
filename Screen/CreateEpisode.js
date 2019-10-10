import React from 'react';
import {StyleSheet, Image} from 'react-native'
import {Container, Text, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Label,CardItem, View} from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

export default class CreateEpisode extends React.Component{
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
                        <Title style={{color: 'black'}}>Create Episode</Title>
                    </Body>
                    <Right>
                    <Button transparent
                    onPress={()=> this.AddEpisode()}>
                            <Icon style={{color: 'orange'}} name='check' type='FontAwesome'/>
                        </Button>
                    </Right>
                </Header>
                <Item stackedLabel style={style.ItemInput}>
                    <Label style={style.Label}>Name</Label>
                    <Input 
                    onChangeText={(text)=> this.setState({text: text})}
                    style={style.Input}
                    />
                </Item>
                <View>
                    <Text style={style.Episode}>Episode</Text>
                        <FlatList
                            style={{height: 500}}
                            keyExtractor={({item,index})=> index}
                            scrollEnabled={true}
                            data={this.props.navigation.getParam('imageEpisode')}
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
                    onPress={()=> this.addimage()}
                    full 
                    warning>
                        <Icon name='plus' type='Entypo'/>
                        <Text style={{paddingLeft: 0}}>Add Image</Text>
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
                            name: Title,
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
    AddEpisode(){
        var d = new Date().toDateString()
        this.props.navigation.navigate('CreateWebtoon',{
            title: this.state.text,
                date: d,
                image: [
                    this.state.data
                ]
        })
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
})