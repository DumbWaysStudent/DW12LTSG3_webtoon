import React from 'react';
import {StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {Container, Text, Item, Input, Button, Icon, CardItem} from 'native-base';

const data = [{
    id: 1,
    title: 'The Secret of Angel',
    favorite: 40,
    url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
  }, {
    id: 2,
    title: 'Pasutri Gaje',
    favorite: 50,
    url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
  }, {
    id: 3,
    title: 'Young Mom',
    favorite: 60,
    url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
}]

export default class FavoriteScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            dataSource: '',
            search: '',
            isLoading: true,
            onClick : false
        }
    }

    render() {
      return (
        <Container>
            <Item style={style.itemSearch}>
                <Input 
                style={style.search}
                onChangeText={text=> {this.setState({search: text})}}
                />
                <Button transparent onPress={()=> {this.SearchFunc()}}>
                    <Icon style={{color: 'white'}} name='search'/>
                </Button>
            </Item>
            <FlatList
            keyExtractor={(item,index)=>index.toString()}
            data={this.dataSearch()}
            renderItem={({item, index})=>(
            <TouchableOpacity key={item.id} onPress={()=> this.props.navigation.navigate('Detail',{
                id:index,
                title:item.title,
                url: item.url
            })}>
                <CardItem>
                    <Image source={{uri:item.url}} style={style.ImageFlatListDetail}/>
                        <Text style= {{fontFamily: 'Roboto',alignSelf: 'flex-start',paddingTop: 20, fontWeight: 'bold',fontSize: 22, paddingLeft: 10}}>{item.title}</Text>
                    <Text style= {{fontFamily: 'Roboto',alignSelf: 'center', position: 'absolute', fontSize: 16, marginLeft: 130}}>{item.favorite} Favorite</Text>
                </CardItem>
            </TouchableOpacity>
                
            )}
            />
        </Container>
      );
    }
    dataSearch(){
        if(this.state.search){
            return this.state.dataSource
        }else{
            return data
        }
    }
    SearchFunc(){
        if(this.state.search){
            const textData = this.state.search.toUpperCase();
            const FilterData = data.filter(function(item){
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            this.setState({
                dataSource : FilterData
            })
        }
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