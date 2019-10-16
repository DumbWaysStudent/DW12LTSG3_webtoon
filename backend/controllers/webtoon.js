const Webtoon = require('../models').webtoon
const Users = require('../models').user
const Episode = require('../models').episode
const Detail = require('../models').detail

exports.index = (req, res) => {
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
        res.send(err)
    })
}
exports.show = (req, res) => {
    const webtoon_id = req.params.id
    Episode.findAll({
        where:{webtoon_id}
    })
    .then(function(result){
        res.send(result)
    })
    .catch(function(err){
        res.send(err)
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
        res.send(err)
    })
}