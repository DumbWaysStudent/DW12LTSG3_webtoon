import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity,FlatList,Share,} from 'react-native'
import {Container, Button, Icon, Header, Left, Right, Body,  Title, Text, CardItem} from 'native-base'

const data = [{
    id: 0,
    title: 'Episode 1',
    date: '19-09-2010',
    url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
  }, {
    id: 1,
    title: 'Episode 2',
    date: '09-11-2022',
    url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
  }, {
    id: 2,
    title: 'Episode 3',
    date: '04-12-2000',
    url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
}]



export default class DetailScreen extends React.Component{
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
                        <Title style={{color: 'black'}}>{state.params.data['title']}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=> this.ShareFunc()}>
                            <Icon name='share-alt' style={{color: 'black'}} type='FontAwesome'/>
                        </Button>
                    </Right>
                    </Header>
                    <Image 
                        source={{uri: state.params.data['cover']}}
                        style={style.imageDetail}
                    />
                    <Container style={style.ContainerFlatList}>
                        <FlatList
                        keyExtractor={(item,index)=> index.toString()}
                        data={data}
                        renderItem={({item,index})=>(
                        <TouchableOpacity key={item.id} onPress={()=>this.props.navigation.navigate('Episode',{
                            id: item.id,
                            title: item.title,
                            url: item.url
                        })}>
                            <CardItem>
                                    <Image source={{uri:item.url}} style={style.ImageFlatListDetail}/>
                                    <Text style= {{fontFamily: 'Roboto',alignSelf: 'flex-start',paddingTop: 20, fontWeight: 'bold',fontSize: 22, paddingLeft: 10}}>{item.title}</Text>
                                    <Text style= {{fontFamily: 'Roboto',alignSelf: 'center', position: 'absolute', fontSize: 14, marginLeft: 130}}>{item.date}</Text>
                            </CardItem>
                        </TouchableOpacity>
                        )}
                        />
                    </Container>
            </Container>
        )
    }
    ShareFunc(){
        Share.share({
            title: this.props.navigation.getParam('title'),
            message: "Ayo Kunjungi Clone Webtoon",
            
        });
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