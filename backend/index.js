require('express-group-routes')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000

const AuthController = require('./controllers/auth')

app.use(bodyParser.json())
app.group('/api/v1',(router)=>{
    //User
    router.post('/login',
    AuthController.login)

    //Webtoon
    router.get('/webtoons',
    WebtoonControllers.index)

})

app.listen(port, ()=>console.log(`SERVER RUN IN ${port}`))