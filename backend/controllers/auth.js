const jwt = require('jsonwebtoken')

const models = require('../models')
const User = models.user

exports.login = (req, res)=>{    
    const email = req.body.email
    const password = req.body.password

    User.findOne({where: {email, password}})
    .then(user=>{
        if(user){
            const token = jwt.sign({ userName: user.name }, 'secret-1945')
            res.send({
                id:user.id,
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