import React from 'react';
import {StyleSheet, Image, FlatList, View, TouchableOpacity } from 'react-native'
import {Container, Text, Input, Icon, Item, Button, Card, CardItem, Left, Right} from 'native-base';
import Slideshow from 'react-native-slideshow';
import { ScrollView} from 'react-native-gesture-handler';


const data = [{
    id: 1,
    title: 'The Secret of Angel',
    url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
  }, {
    id: 2,
    title: 'Pasutri Gaje',
    url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
  }, {
    id: 3,
    title: 'Young Mom',
    url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
}]
export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            position: 0,
            interval: null,
            dataSource : data
        }
    }
    componentDidMount(){
        this.setState({
            interval: setInterval(()=>{
                this.setState({
                    position: this.state.position === this.state.dataSource.length ? 0 : this.state.position+1
                });
            },2000)
        });
    }
    UNSAFE_componentWillMount(){
        clearInterval(this.state.interval)
    } 
    _keyExtractor({item, index}){
        return(
            index
        )
    }
    render(){
       return(
            <Container>
                <ScrollView>
                    <Item style={style.itemSearch}>
                        <Input 
                        style={style.search}
                        />
                        <Button transparent>
                            <Icon style={{color: 'white'}} name='search'/>
                        </Button>
                    </Item>
                    <View style={{marginLeft: 20, marginRight:20, borderRadius: 5, borderColor: 'black', borderWidth: 2}}>
                        <Slideshow 
                            style={style.Carausel}
                            dataSource={this.state.dataSource}
                            position={this.state.position}
                            onPositionChanged={position => this.setState({ position })}
                            height={200}
                            resizeMode='cover'
                        />
                    </View>
                    <Text style={style.title}>Favorite</Text>
                    <View style={{height:200 }}>
                        <FlatList
                            style={style.favoriteFlatlist}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={true}
                            horizontal={true}
                            data={data}
                            renderItem={({item,index})=>(
                                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Detail', {
                                    id: item.id,
                                    title: item.title,
                                    url: item.url
                                })}>
                                    <View key={index} style={style.favorite}>
                                        <Image source={{uri: item.url}} style={style.imageFlatList}/>
                                        <Text style={style.titleFlatList}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={this._keyExtractor}
                        />
                    </View>
                    <Text style={style.title}>All</Text>
                    {data.map((item, index)=>{
                        return(
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Detail', {
                            id: item.id,
                            title: item.title,
                            url: item.url
                        })}}>
                            <Card key={item.id} style={style.listAll} transparent>
                                <CardItem>
                                    <Left style={{marginRight: 0, paddingRight:0}}>
                                        <Image source={{uri: item.url}} style={style.imageAll}/>
                                        <Text style={style.titleListAll}>{item.title}</Text>
                                        
                                    </Left>
                                    <Right style={{marginLeft: 140,paddingTop: 30,alignItems: 'flex-start', position: 'absolute'}}>
                                        <Button warning>
                                            <Icon name='plus' type='AntDesign' style={{marginRight: 0,}}/>
                                            <Text>Favorite</Text>
                                        </Button>
                                    </Right>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </Container>
        )
    }
}

const style = StyleSheet.create({
    search: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: 'white',
        paddingLeft: 10
    },
    itemSearch:{
        backgroundColor: 'orange',
        color: 'white',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
        borderWidth: 0.5,
        borderColor: 'black',
        borderBottomWidth: 0,
    },
    favoriteFlatlist:{
        marginTop: 10,
        marginLeft:20,
        height: 150,
        marginBottom: 0,
        paddingBottom: 0,
    },
    title:{
        fontSize: 24,
        fontFamily: 'Roboto',
        paddingTop: 10,
        paddingLeft: 20,
        fontWeight: 'bold'
    },
    imageFlatList:{
        width: 140,
        height: 150,
        borderWidth: 2,
        borderColor: 'black',
        padding: 5
    },
    favorite: {
        paddingRight: 20,
        paddingBottom: 0,
        marginBottom: 0,
        height: 150,
    },
    titleFlatList:{
        paddingTop:10,
        fontSize: 18,
        fontFamily: 'Roboto',
        alignItems: 'flex-start'
    },
    imageAll:{
        width: 100,
        height: 100,
        borderColor: 'black',
        borderWidth: 2,
    },
    ListAll: {
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 10,
        borderBottomWidth: 0,
    },
    titleListAll:{
        fontFamily: 'Roboto',
        paddingTop: 10,
        paddingLeft: 10,
        alignSelf: 'baseline',
        fontSize: 20,
    },
    buttonListAll: {
        alignSelf: 'flex-start'
    },
    Carausel: {
        paddingLeft: 10,
        paddingRight: 10
    }
})