import React from 'react';
import {StyleSheet, Image, View} from 'react-native'
import {Container, Button, Icon, Header, Left, Right, Body,Item, Title, Text} from 'native-base'
import { FlatList } from 'react-native-gesture-handler';

const data = [{
    id: 1,
    title: 'Episode 1',
    date: '19-09-2010',
    url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
  }, {
    id: 2,
    title: 'Episode 2',
    date: '09-11-2022',
    url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
  }, {
    id: 3,
    title: 'Episode 3',
    date: '04-12-2000',
    url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
}]

export default class DetailScreen extends React.Component{
    renderItemEpisode({item, index}){
        return(
            <Item style={{borderBottomWidth:0}}>
                <Image source={{uri:item.url}} style={style.ImageFlatListDetail}/>
                <Text style={{alignSelf: 'flex-start', fontSize: 22,fontWeight: 'bold', paddingLeft: 10, paddingTop: 10}}>{item.title}</Text>
                <Text style={{position: 'absolute', marginLeft: 112, fontSize: 15}}>{item.date}</Text>
            </Item>
        )
    } 
    render(){
        const { state, navigate } = this.props.navigation;
        return(
            <Container>
                <Header style={style.header} androidStatusBarColor="black">
                    <Left>
                        <Button transparent onPress={()=> {this.props.navigation.goBack()}}>
                        <Icon name='arrow-back' type='MaterialIcons' style={{color: 'black'}}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color: 'black'}}>{state.params.title}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                        <Icon name='share-alt' style={{color: 'black'}} type='FontAwesome'/>
                        </Button>
                    </Right>
                    </Header>
                    <Image 
                        source={{uri: state.params.url}}
                        style={style.imageDetail}
                    />
                    <Container style={style.ContainerFlatList}>
                        <FlatList
                        data={data}
                        renderItem={this.renderItemEpisode}
                        />
                    </Container>
            </Container>
        )
    }
}

const style = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        color: 'black'
    },
    imageDetail:{
        height:200,
    },
    ImageFlatListDetail:{
        width: 100,
        height: 100,
        borderWidth: 3,
        borderColor: 'black',
        marginBottom: 20
    },
    ContainerFlatList: {
        marginLeft: 20,
        marginTop:20
    }
})