require('express-group-routes')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000

const UsersControllers = require('./controllers/users')
const WebtoonControllers = require('./controllers/webtoon')
const EpisodeControllers = require('./controllers/episode')
const DetailControllers = require('./controllers/detail')
const AuthControllers = require('./controllers/auth')
const { authenticated } = require('./middleware')

app.use(bodyParser.json())
app.group('/api/v1',(router)=>{
    //Auth
    router.post('/login',
    AuthControllers.login)

    router.post('/register',
    AuthControllers.register)
    //Users
    router.get('/users',
    UsersControllers.index)

    router.get('/users/:id',
    UsersControllers.show)

    router.post('/users',
    authenticated,
    UsersControllers.store)

    router.put('/users/:id',
    authenticated,
    UsersControllers.update)

    router.delete('/users/:id',
    authenticated,
    UsersControllers.delete)

    //Webtoon
    router.get('/webtoons',
    WebtoonControllers.index)

    router.get('/webtoons/:id',
    WebtoonControllers.show)


    router.post('/webtoons',
    authenticated,
    WebtoonControllers.store)

    router.put('/webtoons/:id',
    authenticated,
    WebtoonControllers.store)

    router.delete('/webtoons:id',
    authenticated,
    WebtoonControllers.update)

    //Episode
    router.get('/episode',
    EpisodeControllers.index)

    router.get('/episode/:id',
    EpisodeControllers.show)

    router.post('/episode',
    EpisodeControllers.store)

    router.put('/episode/:id',
    authenticated,
    EpisodeControllers.update)

    router.delete('/episode/:id',
    authenticated,
    EpisodeControllers.delete)

    //Detail
    router.get('/detail',
    DetailControllers.index)

    router.get('/detail/:id',
    DetailControllers.show)

    router.post('/detail',
    authenticated,
    DetailControllers.store)

    router.put('/detail/:id',
    authenticated,
    DetailControllers.update)

    router.delete('/detail/:id',
    authenticated,
    DetailControllers.delete)
})

app.listen(port, ()=>console.log(`SERVER RUN IN ${port}`))