const Webtoon = require('../models').webtoon
const Users = require('../models').user
const Episode = require('../models').episode
const Detail = require('../models').detail
const Op = require('sequelize').Op


//Method Get /webtoons && /webtoons?favorite=true
exports.index = (req, res) => {
    const title = req.query.title
    if(title){
        Webtoon.findAll({
            where:{
                title: { [Op.like]: `%${title}%` }
            },
            include:[{
                model:Users,
                as:"createdBy"
            }]
        })
        .then(function(result){
            res.send(result)
        })
        .catch(function(err){
            res.send(result)
        })
    }else{
        Webtoon.findAll({
            include: [{
                model:Users,
                as:"createdBy"
            }]
        })
        .then(function(result){
            res.send(result)
        })
        .catch(function(err){
            res.send({
                message: "Error",
                err
            })
        })
    }
}
exports.show = (req, res) => {
    const webtoon_id = req.params.id
    Episode.findAll({
        where:{webtoon_id},
        include:[{
            model:Webtoon,
            as:"Webtoon"
        }]
    })
    .then(function(result){
        res.send(result)
    })
    .catch(function(err){
        res.send({
            message: "Error Cannot Find",
            err
        })
    })
}
exports.showByEpisode = (req, res) => {
    const episode_id = req.params.idepisode
    Detail.findAll({
        where:{episode_id}
    })
    .then(function(result){
        res.send(result)
    })
    .catch(function(err){
        res.send({
            message: "Error Cannot Find",
            err
        })
    })
}
exports.showFavoriteSearch = (req, res) =>{
    const favorite = req.query.is_favorite
    const isFavorite = favorite == 'true' ? 1:0
    if(favorite){
        Webtoon.findAll({
            where:{isFavorite}
        })
        .then(function(result){
            res.send(result)
        })
        .catch(function(err){
            res.send({
                message: "Error Cannot Find",
                err
            })
        })
    }
}