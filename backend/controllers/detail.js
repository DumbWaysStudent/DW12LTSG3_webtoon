const Detail = require('../models').detail
const Episode = require('../models').episode

exports.index = (req, res) => {
    Detail.findAll({
        include: [{
            model: Episode,
            as: "Episode"
        }]
    })
    .then(result=>res.send(result))
    .catch((err)=>{
        res.send({
            msg: "Cannot Get",
            err
        })
    })
}

exports.show = (req, res) => {
    const id = req.params.id
    Detail.findOne({
        where:{id},
        include: [{
            model: Episode,
            as: "Episode"
        }]
    })
    .then((result)=>{
        if(result==null){
            res.send({
                msg: "Episode Detail is null"
            })
        }else{
            res.send({
                result
            })
        }
    })
    .catch((err)=>{
        res.send({
            msg: "Error Cannot Get",
            err
        })
    })
}

exports.store = (req, res) => {
    const data = req.body
    Detail.create({
        name: data.name,
        image: data.image,
        date: data.date,
        episode_id: data.episode_id,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then((result)=>{
        res.send({
            msg: `Details ${data.title} has created`,
            result
        })
    })
    .catch((err)=>{
        res.send({
            msg: "Cannot Created",
            err
        })
    })
}

exports.update = (req, res) => {
    const id   = req.params.id
    const data = req.body
    Detail.update({
        name: data.name,
        image: data.image,
        episode_id: data.episode_id,
        updatedAt: new Date()
    },
    {
        where: {id}
    })
    .then((result)=>{
        res.send({
            msg: `Episode Detail ${data.title} has be updated`,
            result
        })
    })
    .catch((err)=>{
        res.send({
            msg: `Cannot update Episode Detail ${data.title}`,
            err
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id
    Detail.destroy({
        where: {id},
    })
    .then((result)=>{
        res.send({
            msg: `Episode Detail ${id} has deleted`
        })
    })
    .catch((err)=>{
        res.send({
            msg: "Error Cannot Deleted",
            err
        })
    })
}