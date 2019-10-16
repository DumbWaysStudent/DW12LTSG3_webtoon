import React from 'react';
import {StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {Container, Text, Item, Input, Button, Icon, CardItem} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios';

export default class FavoriteScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            dataSource: '',
            search: '',
            isLoading: true,
            onClick : false,
            UserData: false
        }
    }
    componentDidMount = async() => {
        const User = JSON.parse( await AsyncStorage.getItem('userData'))
        if(User){
            await Axios({
                method: 'patch',
                url:`http://192.168.0.49:4000/api/v1/favorite`
            })
            .then(result=>{
                this.setState({
                    dataSource: result.data
                })
            })
            this.setState({
                UserData: true
            })
        }else{
            this.setState({
                UserData: false
            })
        }
    }
    render() {
    const {UserData} = this.state
      if(UserData==true){
        return (
            <Container>
                <Item style={style.itemSearch}>
                    <Input 
                    style={style.search}
                    onChangeText={text=> {this.setState({search: text})}}
                    />
                    <Button transparent>
                        <Icon style={{color: 'white'}} name='search'/>
                    </Button>
                </Item>
                <FlatList
                keyExtractor={(item,index)=>index.toString()}
                data={this.state.dataSource}
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
        }else{
            return(
                <Container style={style.Container}>
                    <Text>You Must Login </Text>
                </Container>
            )
        }
    }
    // dataSearch(){
    //     if(this.state.search){
    //         return this.state.dataSource
    //     }else{
    //         return data
    //     }
    // }
    // SearchFunc(){
    //     if(this.state.search){
    //         const textData = this.state.search.toUpperCase();
    //         const FilterData = data.filter(function(item){
    //             const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
    //             return itemData.indexOf(textData) > -1;
    //         })
    //         this.setState({
    //             dataSource : FilterData
    //         })
    //     }
    // }
}
const style = StyleSheet.create({
    Container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
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