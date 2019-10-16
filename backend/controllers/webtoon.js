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
                error: true,
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
            error: true,
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
            error: true,
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
                error: true,
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
    .catch(function(err){
        res.send({
            error: true,
            message: "Error Cannot Find",
            err
        })
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
            error: true,
            message: "Error",
            err
        })
    })
}

//Get All Episode By Webtoon Id For Screen Create My Webtoon
exports.showEpisodeById = (req, res) => {
    const webtoon_id = req.params.webtoonid
    Episode.findAll({
        where: {webtoon_id}
    })
    .then(function(result){
        res.send(result)
    })
    .catch(function(err){
        res.send({
            error: true,
            message: "Error Can't Find",
            err
        })
    })
}

exports.UpdateByWebtoons = (req, res) => {
    const id = req.params.webtoonid
    const body = req.body
    Webtoon.update({
        title: body.title,
        genre: body.genre,
        cover: body.cover,
        updatedAt: new Date()
    },
    {
        where: {id}
    })
    .then(function(result){
        res.send({
            ...body,
            result
        })
    })
    .catch(function(err){
        res.send({
            error: true,
            message: "Error can't update",
            err
        })
    })
}

//Delete Webtoon By Users
exports.DeleteByWebtoons = (req, res) => {
    const id = req.params.webtoonid
    Webtoon.destroy({
        where: {id}
    })
    .then(function(result){
        res.send({
            id,
            msg: `Webtoons Id ${id} has deleted`
        })
    })
    .catch(function(err){
        res.send({
            error: true,
            message: "Can't deleted webtoon",
            err
        })
    })
}

//Create Episode By Webtoon
exports.storeEpisode = (req, res) => {
    const webtoon_id = req.params.webtoonid
    const body = req.body
    Episode.create({
        title: body.title,
        cover: body.cover,
        webtoon_id,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(function(result){
        res.send(result)
    })
    .catch(function(err){
        res.send({
            error: true,
            message: "Can't Create Webtoon",
            err
        })
    })
}

//Get All Images for Create My Screen Webtoon
exports.showByDetail = (req, res) => {
    const episode_id = req.params.episodeid
    Detail.findAll({
        where: {episode_id}
    })
    .then(function(result){
        res.send(result)
    })
    .catch(function(err){
        res.send({
            error: true,
            message: "Can't Find This Detail",
            err
        })
    })
}

//Update Episode by Id
exports.updateByEpisode = (req, res) => {
    const id = req.params.episodeid
    const body = req.body
    Episode.update({
        title: body.title,
        cover: body.cover,
        updatedAt: new Date()
    },
    {
        where : {id}
    })
    .then(function(result){
        res.send({
            ...body,
            result
        })
    })
    .catch(function(err){
        res.send({
            error: true,
            message : "can't update episode",
            err
        })
    })
}

//Delete Episode
exports.DeleteEpisode = (req, res) => {
    const id = req.params.episodeid
    Episode.destroy({
        where: {id}
    })
    .then(function(result){
        res.send({
            message: `Episode ${id} Has been deleted`,
            result
        })
    })
    .catch(function(err){
        res.send({
            error: true,
            message: "Can't Update",
            err
        })
    })
}