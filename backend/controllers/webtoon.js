const Webtoon = require('../models').webtoon
const Users = require('../models').user

exports.index = (req, res) => {
    Webtoon.findAll({
        include: [{
            model: Users,
            as: "createdBy"
        },
    ]
    })
    .then((webtoon)=>{
        res.send(webtoon)
    })
    .catch((err)=>{
        res.send({
            msg: "Error Cannot Find",
            err
        })
    })
}
exports.index = (req, res) => {
    const favorite = req.query.is_favorite
    const condition = favorite == true ? 1:0
    if(!favorite){
        Webtoon.findAll({
            include: [{
                model: Users,
                as: "createdBy"
            },
        ]
        })
        .then((webtoon)=>{
            res.send(webtoon)
        })
        .catch((err)=>{
            res.send({
                msg: "Error Cannot Find",
                err
            })
        })
    }else{
        Webtoon.findAll({where:{isFavorite:condition}},{
            include: [{
                model: Users,
                as: "createdBy"
            },
        ]
        })
        .then((webtoon)=>{
            res.send(webtoon)
        })
        .catch((err)=>{
            res.send({
                msg: "Error Cannot Find",
                err
            })
        })
    }
}
exports.show = (req, res) => {
    const id = req.params.id
    Webtoon.findOne({where: {id},
        include: [{
            model: Users,
            as: 'createdBy'
        }]
    })
    .then((webtoon)=>{
        if(webtoon == null){
            res.send({
                msg : `Error Cannot Find ${id}`
            })
        }else{
            res.send({webtoon})
        }
    })
    .catch((err)=>{
        res.send({
            msg: "Error Can't Find",
            err
        })
    })
}


exports.store = (req, res) => {
    const data = req.body
    Webtoon.create({
        title: data.title,
        description: data.description,
        cover: data.cover,
        favorite: data.favorite,
        episode: data.episode,
        user_id: data.user_id,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then((webtoon)=>{
        res.send({
            msg: `Webtoon ${data.title} Has be created`,
            webtoon
        })
    })
    .catch((err)=>{
        res.send({
            msg: "Error can't created",
            err
        })
    })
}

exports.update = (req, res) => {
    const id = req.params.id
    const data = req.body
    Webtoon.update({
        title: data.title,
        description: data.description,
        cover: data.cover,
        favorite: data.favorite,
        episode: data.episode,
        user_id: data.user_id
    },{
        where: {id}
    })
    .then((webtoon)=>{
        res.send({
            msg: `Webtoon ${data.title} has updated`,
            webtoon
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id
    Webtoon.destroy({
        where: {id}
    })
    .then((webtoon)=>{
        res.send({
            msg: `Webtoon ${id} has deleted`,
            webtoon
        })
    })
    .catch((err)=>{
        res.send({
            msg: "Error can't delete",
            err
        })
    })
}