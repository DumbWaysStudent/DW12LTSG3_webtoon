require('express-group-routes')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000

const AuthController = require('./controllers/auth')
const WebtoonController = require('./controllers/webtoon')
const { authenticated } = require('./middleware')

app.use(bodyParser.json())
app.group('/api/v1',(router)=>{
    //User
    router.post('/login',
    AuthController.login)
    router.post('/register',
    AuthController.register)

    //Webtoon
    router.get('/webtoons',
    WebtoonController.index)
    router.get('/webtoon/:idwebtoon/',
    WebtoonController.show)
    router.get('/webtoon/:idwebtoon/episode/:idepisode',
    WebtoonController.showByEpisode)
    router.get('/webtoon',
    authenticated,
    WebtoonController.showFavoriteSearch)

    //Webtoon By Users
    router.get('/user/:id/webtoons',
    authenticated,
    WebtoonController.showByUsers)

    //Create Webtoon By Users
    router.post('/user/:id/webtoons',
    authenticated,
    WebtoonController.store)

    //Get All Episode For Webtoon
    router.get('/user/:userid/webtoon/:webtoonid/episodes',
    authenticated,
    WebtoonController.showEpisodeById)

    //Update Webtoon By Users
    router.put('/user/:userid/webtoon/:webtoonid',
    authenticated,
    WebtoonController.UpdateByWebtoons)

    //Delete Webtoon By Users 
    router.delete('/user/:userid/webtoon/:webtoonid',
    authenticated,
    WebtoonController.DeleteByWebtoons)

    //Create Episode By Webtoon 
    router.post('/user/:userid/webtoon/:webtoonid/episode',
    authenticated,
    WebtoonController.storeEpisode)

    //Get All Images For Episode
    router.get('/user/:userid/webtoon/:webtoonid/episode/:episodeid/images',
    authenticated,
    WebtoonController.showByDetail)

    //Update Episode By Webtoon
    router.put('/user/:userid/webtoon/:webtoonid/episode/:episodeid',
    authenticated,
    WebtoonController.updateByEpisode)

    //Delete Episode by Webtoon
    router.delete('/user/:userid/webtoon/:webtoonid/episode/:episodeid',
    authenticated,
    WebtoonController.DeleteEpisode)

    //Create Image Episode
    router.post('/user/:userid/webtoon/:webtoonid/episode/:episodeid/images',
    authenticated,
    WebtoonController.storeDetail)

    //Delete Image Episode
    router.delete('/user/:userid/webtoon/:webtoonid/episode/:episodeid/images/:imagesid',
    authenticated,
    WebtoonController.deleteImage)
})

app.listen(port, ()=>console.log(`SERVER RUN IN ${port}`))