const Webtoon = require('../models').webtoon
const Users = require('../models').user
const Episode = require('../models').episode
const Detail = require('../models').detail
const Op = require('sequelize').Op


//Method Get /webtoons && /webtoons?title
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

//Get All Episode By Webtoon Id
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

//Get All Image Episode By Episode Id
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

//Get All Favorite By Favorite Is True
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

//Get All Webtoon By Users Id
exports.showByUsers = (req, res) => {
    const user_id = req.params.id
    Webtoon.findAll({
        where: {user_id}
    })
    .then(function(result){
        res.send(result)
    })
}

//Store /Create Webtoons By Users Id
exports.store = (req, res) => {
    const user_id = req.params.id
    const body = req.body
    Webtoon.create({
        title: body.title,
        genre: body.genre,
        cover: body.cover,
        isFavorite: false,
        user_id,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(function(result){
        res.send({
            message: "Your Account Has Created"
        })
    })
    .catch(function(err){
        res.send({
            message: "Error",
            err
        })
    })
}