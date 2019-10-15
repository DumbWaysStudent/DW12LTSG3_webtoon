const Episode = require('../models').episode
const Webtoon = require('../models').webtoon

exports.index = (req, res) => {
    Episode.findAll({
        include: [{
            model: Webtoon,
            as: "Webtoon"
        }]
    })
    .then(episode=>
        res.send(episode)
    )
    .catch((err)=>{
        res.send({
            msg: "Error can not found",
            err
        })
    })
}

exports.show = (req, res) => {
    const id = req.params.id
    Episode.findOne({
        where: {id},
        include: [{
            model: Webtoon,
            as: "Webtoon"
        }]
    })
    .then((episode)=>{
        if(episode == null){
            res.send({
                msg: "Data is null"
            })
        }else{
            res.send({episode})
        }
    })
    .catch((err)=>{
        res.send({
            msg: "Error cannot find",
            err
        })
    })
}

exports.store = (req, res) => {
    const data  = req.body
    episode.create({
        title: data.title,
        cover: data.cover,
        date: new Date(),
        webtoon_id: data.webtoon_id,
        createdAt: new Date(),
        updatedAt: new Date
    })
    .then((result)=>{
        res.send({
            msg: `Data ${data.title} has to created`
        })
    })
    .catch((err)=>{
        res.send({
            msg: "Error cannot created",
            err
        })
    })
}

exports.update = (req, res) => {
    const id = req.params.id
    const data = req.body
    Episode.update({
        title: data.title,
        cover: data.cover,
        date: new Date(),
        webtoon_id: data.webtoon_id,
        updatedAt: new Date
    },
    {
        where: {id}
    })
    .then((result)=>{
        res.send({
            msg: `Episode ${data.title} Has be updated`,
            result
        })
    })
    .catch((err)=>{
        res.send({
            msg: "Error cannot updated",
            err
        })
    })
}

exports.delete = (req, res) => {
    const id  = req.params.id
    Episode.destroy({
        where: {id}
    })
    .then((result)=>{
        res.send({
            msg: `Episode ${id} has deleted`
        })
    })
    .catch((err)=>{
        res.send({
            msg: "Error cannot deleted",
            err
        })
    })
}