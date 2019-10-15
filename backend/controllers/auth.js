const jwt = require('jsonwebtoken')

const models = require('../models')
const User = models.user

exports.login = (req, res)=>{    
    const email = req.body.email
    const password = req.body.password

    User.findOne({where: {email, password}}).then(user=>{
        if(user){
            const token = jwt.sign({ userName: user.name }, 'secret-1945')
            res.send({
                name:user.name,
                email:user.email,
                image:user.image,
                token
            }) 
        }else{
            res.send({
                error: true,
                message: "Wrong Email or Password!"
            })
        }
    })

    
}

exports.register = (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    User.findAll({where: {email}})
    then(function(user){
        if(user){
            res.send({
                msg: "Email has be used"
            })
        }else{
            User.create({
                email: email,
                password: password,
                name: name,
                createdAt: new Date(),
                updateAt: new Date()
            })
            .then((result)=>{
                res.send({
                    msg: "Your Account has be created",
                    info: "You can Sign In Now"
                })
            })
        }
    })
}