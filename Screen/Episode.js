import React from 'react';
import {Image, StyleSheet, Share} from 'react-native'
import {Container, Text, Icon, Header, Left, Right, Body, Button, Title} from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';

const data = [{
    id: 1,
    title: 'Episode 1',
    date: '19-09-2010',
    image: [
        'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
        'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
    ]
  }, {
    id: 2,
    title: 'Episode 2',
    date: '09-11-2022',
    image: [
        'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
        'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
    ]
    }, {
    id: 3,
    title: 'Episode 3',
    date: '04-12-2000',
    image: [
        'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
        'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
    ]
}]
const Options = {
    title: '',
    message: '',
    url: '',
    subject: ''
}
export default class EpisodeScreen extends React.Component{
    render(){
        const { state } = this.props.navigation;
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
                        <Button transparent onPress={()=> this.ShareFunc()}>
                        <Icon name='share-alt' style={{color: 'black'}} type='FontAwesome'/>
                        </Button>
                    </Right>
                </Header>
                <ScrollView>
                {data[state.params.id].image.map((item, index)=>{
                    return(
                        <Image key={index} source={{uri : item}} style={style.imageEpisode}/>
                    )
                })}
                </ScrollView>
            </Container>
        )
    }
    ShareFunc(){
        Share.share(Options);
    }
}
const style = StyleSheet.create({
    imageEpisode: {
        height: 500
    },
    header: {
        backgroundColor: 'white',
        color: 'black'
    },
})