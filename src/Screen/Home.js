import React from 'react';
import {
    StyleSheet, 
    Image, 
    FlatList, 
    View, 
    TouchableOpacity, 
    ActivityIndicator,
    SafeAreaView 
       } from 'react-native'
import {
    Container, 
    Text, 
    Input, 
    Icon, 
    Item, 
    Button, 
    Card, 
    CardItem, 
    Left, 
    Right} from 'native-base';
import { ScrollView} from 'react-native-gesture-handler';
import { BackgroundCarousel } from "../asset/carausel/index";
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            position: 1,
            interval: null,
            data: '',
            isLoading: true,
            filterData: '',
            token: ''
        }
    }
    componentDidMount = async() =>{
        axios({
            method: 'get',
            url: 'http://192.168.0.49:4000/api/v1/webtoons'
        })
        .then(result=>{
            this.setState({
                data:result.data,
                isLoading: false
            })
        })
        const token = await AsyncStorage.getItem('userToken');
        this.setState({token})
    }
    Favorite(){
        const filer = "isFavorite"
        const FilterFavorite = this.state.data.filter(function(item){
            return item[filer] == true 
        })
        return FilterFavorite
    }
    buttonFavorite(){

    }
    Slider(){
        const data = this.state.data
        const SliceData = data.slice(0, 5)
        return SliceData
    }
    Search(text){
        const {data} = this.state
        const filter = data.filter(function(item){
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase()
            return itemData.indexOf(text.toUpperCase()) > -1
        })
        this.setState({
            filterData: filter
        })
    }
    render(){
        const {data, isLoading, filterData} = this.state
        if(!isLoading){
            return(
                <Container>
                    <ScrollView>
                        <Item style={style.itemSearch}>
                            <Input 
                                style={style.search}
                                onChangeText={(text)=>this.Search(text)}
                            />
                            <Button transparent>
                                <Icon style={{color: 'white'}} name='search'/>
                            </Button>
                        </Item>
                            <BackgroundCarousel images={this.Slider()} />
                        <Text style={style.title}>Favorite</Text>
                            <View style={{height:210 }}>
                                <FlatList
                                    style={style.favoriteFlatlist}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEnabled={true}
                                    horizontal={true}
                                    data={this.Favorite()}
                                    renderItem={({item,index})=>(
                                        <View style={style.favorite}  key={item.id}>
                                            <Image source={{uri: item.cover}} style={style.imageFlatList}/>
                                            <TouchableOpacity 
                                             
                                                onPress={()=> this.props.navigation.navigate('Detail', {
                                                    id: item.id,
                                                    title: item.title,
                                                    url: item.url
                                                })}
                                            >
                                                <Text style={style.titleFlatList}>{item.title}</Text>
                                            </TouchableOpacity>
                                            
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        <Text style={style.title}>All</Text>
                            <FlatList
                            scrollEnabled={false}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            data={filterData ? filterData : data}
                            keyExtractor={(item,index)=> index.toString()}
                            renderItem={({item, index})=>(
                                <Card style={style.listAll} transparent>
                                    <CardItem>
                                        <Left style={style.leftall}>
                                            <Image source={{uri: item.cover}} style={style.imageAll}/>
                                        </Left>
                                        <Right style={style.rightall}>
                                            <Text style={style.titleListAll}>{item.title}</Text>
                                            <Text style={style.genreListAll}>{item.genre}</Text>
                                            <Button 
                                            disabled={item.isFavorite == true? true : false}
                                            small 
                                            style={item.isFavorite == false ? style.buttonListAll : style.buttonListAllT}
                                            onPress={this.buttonFavorite()}>
                                                <Icon name='plus' type='AntDesign' style={{marginRight: 0,}}/>
                                                <Text>Favorite</Text>
                                            </Button>
                                        </Right>
                                            <Button
                                            style={style.btnview}
                                            small
                                            >
                                                <Text>Read</Text>
                                            </Button>
                                    </CardItem>
                                </Card>
                            )}
                            />
                    </ScrollView>
                </Container>
            )
        }else{
            return (
                <View style={style.activity}>
                    <ActivityIndicator size='large' color='#2ecc71'/>
                    <Text style={style.warning}>Please Wait....</Text>
                </View>
            )
        }
    }
}

const style = StyleSheet.create({
    warning:{
        fontFamily: 'Roboto-Regular',
        paddingTop: 10,
        fontSize: 15,
        color: '#2ecc71'
    },
    activity:{
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    search: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: 'white',
        paddingLeft: 10
    },
    itemSearch:{
        backgroundColor: '#2ecc71',
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
        height: 170,
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
        height: 140,
        borderRadius: 10,
        padding: 5
    },
    favorite: {
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 0,
        marginBottom: 0,
        height: 200,
        backgroundColor: '#2ecc71',
        borderRadius: 10,
        marginRight: 10
    },
    titleFlatList:{
        paddingTop:10,
        paddingBottom:10,
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        alignItems: 'flex-start',
        width: 140,
        color: 'white'
    },
    imageAll:{
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    ListAll: {
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 10,
        borderBottomWidth: 0,
    },
    titleListAll:{
        fontFamily: 'Roboto-Regular',
        alignSelf: 'baseline',
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'flex-start',
        paddingBottom: 5
    },
    genreListAll:{
        fontFamily: 'Roboto-Italic',
        alignSelf: 'baseline',
        fontSize: 16,
        color: 'orange',
        paddingBottom: 20
    },
    buttonListAll: {
        alignSelf: 'flex-start',
        borderRadius: 50,
        backgroundColor: '#2ecc71'
    },
    
    buttonListAllT: {
        alignSelf: 'flex-start',
        borderRadius: 50,
        backgroundColor: '#1e272e'
    },
    Carausel: {
        paddingLeft: 10,
        paddingRight: 10
    },
    viewSlide:{
        marginLeft: 20,
        marginRight:20, 
        borderRadius: 5, 
    },
    leftall:{
        marginRight: 0,
        paddingRight:0
    },
    rightall:{
        marginLeft: 140,
        paddingTop: 0,
        alignItems: 'flex-start', 
        position: 'absolute'
    },
    btnview: {
        position: 'absolute',
        borderRadius: 50,
        marginLeft: 280,
        top: 79,
        backgroundColor: '#3498db'
    }
    
})