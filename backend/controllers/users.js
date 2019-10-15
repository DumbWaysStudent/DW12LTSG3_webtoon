const Users = require('../models').user

exports.index = (req, res) => {
    Users.findAll()
    .then(users=>res.send(users))
    .catch((err) => {
        res.send({
            message: "Error Cant Get Data",
            err
        })
    });
}

exports.show = (req, res) => {
    const id = req.params.id
    Users.findOne({
        where: {id}
    })
    .then((users)=>{
        if(users == null){
            res.send({
                msg : `Error Cannot Find ${id}`
            })
        }else{
            res.send({users})
        }
    })
    .catch((err)=>{
        res.send({
            msg: "Error Not Found",
            err
        })
    })
}

exports.store = (req, res) => {
    const users = req.body
    Users.create({
        email: users.email,
        password: users.password,
        name: users.name,
        image: users.image,
        createdAt: new Date(),
        updateAt: new Date()
    })
    .then((user)=>{
        res.send({
            msg: "Users Has Created",
            user
        })
    })
}

exports.update = (req, res) => {
    const id = req.params.id
    const users = req.body
    const DateTimeZone =  new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
    Users.update({
        email: users.email,
        password: users.password,
        name: users.name,
        image: users.image,
        updatedAt: DateTimeZone
    },{
        where:{id}
    })
    .then((user)=>{
        res.send({
            msg: `Users ${id} Has Updated`,
            user
        })
    })
    .catch((err)=>{
        res.send({msg: err})
    })
}

exports.delete = (req, res) => {
    const id = req.params.id
    Users.destroy({where: {id}})
    .then((user)=>{
        res.send({
            msg: `Users ${id} Has Deleted`,
            user
        })
    })
}