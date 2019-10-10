import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Container, Text, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Label,CardItem} from 'native-base';
import { FlatList } from 'react-native-gesture-handler';


export default class CreateWebtoonScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            text: ''
        }
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
                        <Title style={{color: 'black'}}>Edit Webtoon</Title>
                    </Body>
                    <Right>
                    <Button transparent onPress={()=>this.props.navigation.navigate('MyWebtoon')}>
                            <Icon style={{color: 'orange'}} name='check' type='FontAwesome'/>
                        </Button>
                    </Right>
                </Header>
                <Item stackedLabel style={style.ItemInput}>
                    <Label style={style.Label}>Name</Label>
                    <Input 
                    style={style.Input}
                    value={this.props.navigation.getParam('title')}
                    onChangeText={(text)=> this.setState({text: text})}
                    />
                </Item>
                <View>
                    <Text style={style.Episode}>Episode</Text>
                    <FlatList
                    data={this.props.navigation.getParam('image')}
                    renderItem={({item, index})=>(
                        <CardItem key={index}>
                            <Image source={{uri:item.url}} style={style.ImageFlatListDetail}/>
                            <Text style= {{fontFamily: 'Roboto',alignSelf: 'flex-start',paddingTop: 20, fontWeight: 'bold',fontSize: 22, paddingLeft: 10}}>{item.title}</Text>
                                    <Text style= {{fontFamily: 'Roboto',alignSelf: 'center', position: 'absolute', fontSize: 14, marginLeft: 130}}>{item.date}</Text>
                        </CardItem>
                    )}
                    />
                </View>
                <Button
                full 
                warning
                onPress={()=>{this.props.navigation.navigate('CreateEpisode',{
                    imageEpisode: this.props.navigation.getParam('imageEpisode')
                })}}>
                    <Icon name='plus' type='Entypo'/>
                    <Text style={{paddingLeft: 0}}>Add Episode</Text>
                </Button>
                <Button
                style={{paddingLeft:20}}
                full 
                danger>
                    <Text style={{paddingLeft: 0}}>Delete Webtoon</Text>
                </Button>
            </Container>
        )
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